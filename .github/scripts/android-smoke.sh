#!/usr/bin/env bash
set -Eeuo pipefail

cd "$GITHUB_WORKSPACE"

capture_evidence() {
  adb logcat -d -s AndroidRuntime:E ReactNativeJS:E > "$GITHUB_WORKSPACE/android-smoke-log.txt" 2>/dev/null || true
  adb exec-out screencap -p > "$GITHUB_WORKSPACE/android-smoke.png" 2>/dev/null || true
}
trap capture_evidence EXIT

test -f android/gradlew
test -f android/app/build/outputs/apk/debug/app-debug.apk
echo "Installing the built Android debug APK."
adb install "$GITHUB_WORKSPACE/android/app/build/outputs/apk/debug/app-debug.apk"
echo "Downloading the official Maestro installer."
curl --fail --show-error --location --connect-timeout 20 --max-time 180 --retry 2 --retry-delay 5 \
  "https://get.maestro.mobile.dev" -o /tmp/install-maestro.sh
echo "Installing Maestro CLI."
timeout --signal=TERM --kill-after=30s 5m bash /tmp/install-maestro.sh 2>&1 | tee "$GITHUB_WORKSPACE/maestro-install.log"
export PATH="$HOME/.maestro/bin:$PATH"
maestro --version

maestro_status=0
echo "Running the Maestro Android UI flow."
set +e
timeout --signal=TERM --kill-after=30s 10m maestro test \
  --format=JUNIT \
  --output=maestro-test-results.xml \
  --test-output-dir=maestro-output \
  --debug-output=maestro-debug \
  maestro/foundation-smoke.yaml 2>&1 | tee "$GITHUB_WORKSPACE/maestro-run.log"
maestro_status=${PIPESTATUS[0]}
set -e

capture_evidence
if grep -E "FATAL EXCEPTION|ReactNativeJS:.*(Error|Exception)" android-smoke-log.txt; then
  exit 1
fi
if ! adb shell pidof com.lockin.fitness; then
  echo "LOCKIN process was not running after the Maestro flow."
  maestro_status=1
fi
exit "$maestro_status"
