const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'development', //production  development
  target: 'web',
  resolve: {
    extensions: [ '.js', '.vue', '.jsx' ]
  },
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: '[name]-aaa.[ext]'
              }
            }
          ]
        }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODEE_ENV: isDev ? 'development' : 'production'
      }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin() //  Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的.参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required

  ]
}

if(isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      // 'vue-style-loader'
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  // config.devTool = '#cheap-modsule-eval-source-map'  // webpack4中貌似不需要
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
    // historyFallback: {
      
    // },
    // open: true,
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()  // 4.x中取消了
  )
}else{
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
  }
  config.output.filename = '[name].[chunkhash:8].js'

  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css') // 4.x好像没有contentHash
  )
}

module.exports = config;