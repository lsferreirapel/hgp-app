module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      ['@babel/transform-runtime'],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@ui': './src/components/ui',
            '@components': './src/components',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@common': './src/common',
            '@generated': './src/generated',
            '@app': './src/app',
            '@': './src',
            '@root': './',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}
