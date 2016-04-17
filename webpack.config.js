const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event; // get the npm life-cycle-event such as `npm run build` result: TARGET = 'build'
const PATHS = {
  src_dir: __dirname + '/src',
  node_dir: __dirname + '/node_modules',
  bower_dir: __dirname + '/bower_components',
  lib_dir: __dirname + '/libs',
  style_dir: __dirname + '/src/styles'
}
const HTML_GENERATOR_OPTIONS = {
    title: "ReactAppBasic",
    template: "./src/views/index.ejs", // custom template
    inject: 'body' // inject all scripts tag to body
}


// set BABEL_ENV environment = npm life-cycle-event
process.env.BABEL_ENV = TARGET;


var config = {
  resolve: {
    // alias for easy require any where in the application
    alias: {
      jquery: PATHS.bower_dir + '/jquery/dist/jquery.min.js',
      jsBootstrap: PATHS.bower_dir + '/bootstrap/dist/js/bootstrap.min.js',
      cssAnimate: PATHS.bower_dir + '/animate.css/animate.min.css',
      cssFontAwesome: PATHS.bower_dir + '/font-awesome/css/font-awesome.min.css'
    },
    extensions: ['', '.js', '.jsx']
  },

  // seperate the entry point to multiple points for eacy chunking of the code
  // seperate the application code and vendor code
  entry: {
    app: ['./src'],
    vendors: [
      'react',
      'react-dom',
      'jquery',
      'jsBootstrap'
    ]
  },

  // Output
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/[name].bundle.js" // produce: app.bundle.js and vendors.bundle.js
  },

  //plugins
  plugins: [
    // inject globals
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      '$': 'jquery',
      'window.$': 'jquery'
    }),
    // let webpack determine which code/modules you use the most and put it in the vendors bundles.
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.bundle.js', Infinity)
  ],

  // modules
  module: {
    loaders: [
      //{ test: /\.jsx$/, loader: 'react-hot', include: PATHS.src_dir },
      { test: /\.js$/, loader: 'babel', include: PATHS.src_dir },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=1000&name=images/img_[hash].[ext]', include: PATHS.img_dir},
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: PATHS.src_dir },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/font_[hash].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/font_[hash].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?&name=fonts/font_[hash].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/font_[hash].[ext]' }
    ]
  }

} //end of config

if(TARGET === 'dev' || !TARGET){
  module.exports = merge(config, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: 1344
    },
    plugins: [
      new HtmlWebpackPlugin(HTML_GENERATOR_OPTIONS),
      //new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if(TARGET === 'build' || TARGET == 'auto-build'){
  module.exports = merge(config, {
    plugins: [
      new HtmlWebpackPlugin(HTML_GENERATOR_OPTIONS)
    ]
  })
}
