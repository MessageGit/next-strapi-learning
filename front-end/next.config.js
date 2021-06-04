// Dotenv
require('dotenv').config()
const webpack = require('webpack')
module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
}

// Sass loader
const path = require('path')
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}