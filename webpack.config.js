var path = require('path')

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/app.js'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	devServer: {
		historyApiFallback: true
	},
	module: {
		loaders: [
			{ test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
			{
				test: /\.js/,
				loaders: ['babel-loader'],
				include: path.join(__dirname, 'src')
			}, {
				test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				loader: 'file-loader?name=[path][name].[ext]'
			}
		]
	}
}