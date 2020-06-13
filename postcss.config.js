module.exports = {
  plugins: {
    'postcss-mixins': {
      mixinsDir: './src/styles/mixins/',
    },
    'postcss-preset-env': {
      importFrom: ['./src/styles/media-queries/media-queries.css'],

      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
    },
  },
}
