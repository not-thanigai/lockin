#!/usr/bin/env bash
set -Eeuo pipefail

cd "$GITHUB_WORKSPACE"

capture_evidence() {
  adb logcat -d -s AndroidRuntime:E ReactNativeJS:E > "$GITHUB_WORKSPACE/android-smoke-log.txt" 2>/dev/null || true
  adb exec-out screencap -p > "$GITHUB_WORKSPACE/android-smoke.png" 2>/dev/null || true
}
trap capture_evidence EXIT

test -f android/gradlew
cd "$GITHUB_WORKSPACE/android"
bash ./gradlew assembleDebug
cd "$GITHUB_WORKSPACE"

adb install "$GITHUB_WORKSPACE/android/app/build/outputs/apk/debug/app-debug.apk"
curl -fsSL "https://get.maestro.mobile.dev" -o /tmp/install-maestro.sh
bash /tmp/install-maestro.sh
export PATH="$HOME/.maestro/bin:$PATH"
maestro --version

maestro_status=0
maestro test \
  --format=JUNIT \
  --output=maestro-test-results.xml \
  --test-output-dir=maestro-output \
  --debug-output=maestro-debug \
  maestro/foundation-smoke.yaml || maestro_status=$?

capture_evidence
if grep -E "FATAL EXCEPTION|ReactNativeJS:.*(Error|Exception)" android-smoke-log.txt; then
  exit 1
fi
if ! adb shell pidof com.lockin.fitness; then
  echo "LOCKIN process was not running after the Maestro flow."
  maestro_status=1
fi
exit "$maestro_status"
