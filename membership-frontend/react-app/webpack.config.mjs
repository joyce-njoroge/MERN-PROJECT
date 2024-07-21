import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the filename of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Resolves CSS imports
          'postcss-loader', // Processes CSS with PostCSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
