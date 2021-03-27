const path = require('path');

module.exports = {
	mode: 'development',
	entry: './test/entry.ts',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'test.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
}