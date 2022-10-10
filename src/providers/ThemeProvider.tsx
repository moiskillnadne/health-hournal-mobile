import { PropsWithChildren, memo } from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

type Props = PropsWithChildren<unknown>;

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const theme = extendTheme({
  colors: {
    primary: {
      50: '#f6e9ff',
      100: '#ddc1f3',
      200: '#c499e7',
      300: '#ab72db',
      400: '#9b57d3',
      500: '#9b57d3',
      600: '#c084fc',
      700: '#9b57d3',
      800: '#7930b6',
      900: '#7930b6',
    },
    secondary: {
      500: '#3EA832',
      600: '#3EA832',
      800: '#3EA832',
    },
    config: {
      initialColorMode: 'light',
    },
  },
  fontConfig: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 22,
      xl: 24,
    },
    OpenSans: {
      100: {
        normal: 'OpenSans',
      },
      200: {
        normal: 'OpenSans',
      },
      300: {
        normal: 'OpenSans',
      },
      400: {
        normal: 'OpenSans',
      },
      500: {
        normal: 'OpenSans-Semibold',
      },
      600: {
        normal: 'OpenSans-Bold',
      },
      700: {
        normal: 'OpenSans-Bold',
      },
    },
  },
  fonts: {
    body: 'OpenSans',
    heading: 'OpenSans',
  },
  components: {
    Checkbox: {
      defaultProps: {
        size: 'lg',
        bg: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
        borderColor: 'white',
        _checked: {
          bg: '#4ca53c',
          borderColor: '#4ca53c',
        },
        _text: {
          fontSize: 'md',
        },
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: 'primary',
        trackColor: { false: '#e9e9ea', true: '#9b57d3' },
        ios_backgroundColor: '#e9e9ea',
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'primary',
        bgColor: 'primary.500',
        py: 3.5,

        _text: {
          fontSize: 'md',
          fontWeight: 'medium',
        },

        _disabled: {
          opacity: 0.7,
          bgColor: '#c8c8c9',

          _text: {
            opacity: 0.5,
            color: 'black',
          },
        },
      },
    },
    Text: {
      defaultProps: {
        fontSize: 'md',
      },
    },
    Input: {
      defaultProps: {
        fontSize: 'md',
        bgColor: 'white',
        py: 4,
        px: 4,
      },
    },
    TextArea: {
      defaultProps: {
        autoCompleteType: 'off',
        bgColor: 'white',
        fontSize: '16px',
        py: 4,
        px: 4,
      },
    },
    Heading: {
      defaultProps: {
        fontSize: '22px',
        fontWeight: 'bold',
      },
    },
  },
});

function ThemeProvider({ children }: Props) {
  return (
    <NativeBaseProvider config={config} theme={theme}>
      {children}
    </NativeBaseProvider>
  );
}

export default memo(ThemeProvider);
