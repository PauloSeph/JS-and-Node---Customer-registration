const path = require('path'); // CommonJS
const MiniCssplugin = require ('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './frontEnd/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js'
  },
  // plugins: [
  //   new MiniCssplugin({
  //     filename: "estilo.css"
  //   })
  // ],
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }, {
      test: /\.css$/,
      use: [
        // MiniCssplugin.loader,
        'style-loader', 
        'css-loader',
      ]
    },
  ]
  },
  devtool: 'source-map'
};


