var path = require('path');

	module.exports = {
		entry: './src/app.ts',
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
		},
		module: {
			rules: [
				{ test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
				{ test: /pixi.min\.js$/, loader: 'expose-loader?PIXI' },
				{ test: /phaser-no-physics.min\.js$/, loader: 'expose-loader?Phaser' }
			]
		},
		devServer: {
			contentBase: path.resolve(__dirname, './'),
			publicPath: '/dist/',
			host: '127.0.0.1',
			port: 8080,
			open: true
		},
		resolve: {
			extensions: ['.ts', '.js'],
			alias: {
				pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.min.js'),
				phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-no-physics.min.js')
			}
		}
};