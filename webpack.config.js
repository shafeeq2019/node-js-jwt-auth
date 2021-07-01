module.exports = {
  // the main entry of our app
  entry: ['./src/index.js', './src/auth/index.js'],
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },
  resolve: {
    alias: {
       vue: 'vue/dist/vue.js'
    }
  },
  // how modules should be transformed
  module: {
    loaders: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          // Using `local` value has same effect like using `modules: true`
          modules: "global",
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]},
      // process *.vue files using vue-loader
      { test: /\.vue$/, loader: 'vue-loader' },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      {
        test: /\.js$/, // rule for .js files
        exclude: /node_modules/,
        loader: "babel-loader" // apply this loader for js files
      }
    ]
  },
  // configure babel-loader.
  // this also applies to the JavaScript inside *.vue files

}
