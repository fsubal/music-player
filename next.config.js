module.exports = {
  env: {},
  /** @param {import('webpack').Configuration} config */
  webpack(config) {
    config.resolve.extensions.push('.gql')

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
}
