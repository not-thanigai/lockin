import { render, screen, userEvent } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import { Action } from '../components';

describe('Action', () => {
  it('exposes an accessible button and invokes its action when pressed', async () => {
    const onPress = jest.fn();
    await render(<Action label="Save entry" onPress={onPress} testID="save-entry" />);

    await userEvent.press(screen.getByRole('button', { name: 'Save entry' }));

    expect(screen.getByTestId('save-entry')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
