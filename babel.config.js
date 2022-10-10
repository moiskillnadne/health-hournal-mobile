module.exports = {
  presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app': './src',
          '@assets': './assets',
          '@features': './src/features',
        },
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
