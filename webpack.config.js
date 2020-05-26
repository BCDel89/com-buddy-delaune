const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: 'dist',
		watchContentBase: true
	},
	plugins: [
		new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
		new CopyPlugin({
			patterns: [
				{from: 'src/assets', to: 'assets'}
			]
		}),
		new HtmlWebpackPlugin({
			title: 'BuddyCDelaune',
			inject: true,
			template: './src/index.html'
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				]
			}
		]
	}
};