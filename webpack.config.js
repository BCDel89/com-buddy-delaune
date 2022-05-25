const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const cleanWebpackPlugin = new CleanWebpackPlugin({cleanStaleWebpackAssets: false});
const copyPlugin = new CopyPlugin({patterns: [{from: 'src/assets', to: 'assets'}]});
const htmlWebpackPlugin = new HtmlWebpackPlugin({title: 'BuddyCDelaune', inject: true, template: './src/index.html'});
// const miniCssExtractPluginBase = new MiniCssExtractPlugin({filename: 'main.css', chunkFilename: '[id].css'});
// const miniCssExtractPluginPrint = new MiniCssExtractPlugin({filename: 'print.css', chunkFilename: '[id].css'});

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: 'dist',
		watchContentBase: true
	},
	plugins: [
		cleanWebpackPlugin,
		copyPlugin,
		htmlWebpackPlugin,
		// miniCssExtractPluginBase,
		// miniCssExtractPluginPrint
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
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
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /(pdf|mobile).scss/,
				use: [
					'style-loader',
					{
						loader: 'file-loader',
						options: {
							name: 'main.min.css'
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
							sourceMap: true,
							sassOptions: {
								outputStyle: 'compressed',
							},
						}
					},
					'resolve-url-loader'
				]
			},
			{
				test: /pdf.scss/,
				use: [
					'style-loader',
					{
						loader: 'file-loader',
						options: {
							name: 'print.min.css'
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
							sourceMap: true,
							sassOptions: {
								outputStyle: 'compressed',
							},
						}
					},
					'resolve-url-loader'
				]
			},
			{
				test: /mobile.scss/,
				use: [
					'style-loader',
					{
						loader: 'file-loader',
						options: {
							name: 'mobile.min.css'
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
							sourceMap: true,
							sassOptions: {
								outputStyle: 'compressed',
							},
						}
					},
					'resolve-url-loader'
				]
			}
		]
	}
};
