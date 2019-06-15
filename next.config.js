const withTypescript = require('@zeit/next-typescript')

require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  /* eslint-disable */
  const withLess = require('@zeit/next-less')
  const lessToJS = require('less-vars-to-js')
  const fs = require('fs')
  // Where your antd-custom.less file lives
  const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assets/theme.less'), 'utf8')
  )
  // fix: prevents error when .less files are required by node
  if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {}
  }

  return withTypescript(withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables // make your antd custom effective
    },
    webpack: (config, options) => {
      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ]

      return config
    }
  }));
};
