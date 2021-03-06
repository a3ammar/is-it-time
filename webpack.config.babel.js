import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',

  entry: {
    app: './src/index',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
  },

  resolve: {
    extensions: ['.js', '.jsx', 'css'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
