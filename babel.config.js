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
            '@ui': './src/common/components/ui',
            '@components': './src/common/components',
            '@assets': './src/common/assets',
            '@hooks': './src/common/hooks',
            '@common': './src/common',
            '@generated': './src/generated',
            '@app': './src/app',
            '@': './src',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  }
}
