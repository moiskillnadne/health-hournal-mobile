import { useLayoutEffect } from 'react';
import { Text, TextInput } from 'react-native';

function useDisabledFontScaling() {
  useLayoutEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    TextInput.defaultProps = Text.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []);
}

export default useDisabledFontScaling;
