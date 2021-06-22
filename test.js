var webpack = require('webpack');
var config = {
  stats : 'errors-only',
    context: __dirname + '/src', // `__dirname` is root of project and `/src` is source
    entry: ['./index.js', './auth/index.js'],
    output: { 
        path: __dirname + '/build/',
        publicPath: 'build/',
        filename: 'build.js'
     },
    module: {
        rules: [ 
            {
                test: /\.js$/, // rule for .js files
                exclude: /node_modules/,
                loader: "babel-loader" // apply this loader for js files
              },
              {
                test: /\.css$/,
                use: [
                 'vue-style-loader',
                  'style-loader', // the order is important. it executes in reverse order !
                  'css-loader' // this will load first !
                ]
              },
              { test: /\.vue$/, loader: 'vue-loader' },
              {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ]}
        ]
    }
}
module.exports = config;