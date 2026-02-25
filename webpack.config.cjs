const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isDevelopment ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
      chunkFilename: isDevelopment ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
      publicPath: isDevelopment ? '/' : './',
      clean: true,
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.module\.(less|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: isDevelopment
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]',
                  exportLocalsConvention: 'camelCase',
                  namedExport: false,
                },
                esModule: false,
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(less|css)$/,
          exclude: /\.module\.(less|css)$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name].[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: true,
      }),
      new ForkTsCheckerWebpackPlugin({
        async: isDevelopment,
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            globOptions: {
              ignore: [
                '**/index.html',
                '**/favicon.ico',
                '**/electron.js',
                '**/preload.js',
              ],
            },
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
        'process.env.PUBLIC_URL': JSON.stringify(isDevelopment ? '/' : '.'),
      }),
    ],
    devServer: {
      port: 3000,
      hot: true,
      open: false,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
    performance: {
      hints: false,
    },
  };
};
