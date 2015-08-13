var webpack = require('webpack');
module.exports = {
	context: __dirname,
	entry: {
		reaction: [ './src/reaction' ],
		examples : [ './examples' ]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		libraryTarget: 'umd',
		pathinfo: true
	},
	resolve: {
		extensions: ['', '.js', '.json'],
		alias: {
			reaction: __dirname + '/src/reaction.js'
		}
	},
	devServer: {
		contentBase: __dirname + '/dist',
		inline: true,
		hot: true
	},
	module: {
		loaders: [
			{
				test    : /\.js$/,
				exclude : /node_modules/,
				loader  : 'babel-loader'
			}
		],
		noParse: /\.min\.js$/
	}
};
