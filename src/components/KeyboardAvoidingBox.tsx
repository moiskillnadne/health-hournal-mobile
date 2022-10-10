import { PropsWithChildren } from 'react';
import { Platform, StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'native-base';

function KeyboardAvoidingBox({ children }: PropsWithChildren<unknown>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight ?? 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingBox;
