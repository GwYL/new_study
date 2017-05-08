var webpack = require("webpack");

var path = require("path");

var PATH = {
	app: path.join(__dirname, "src", "js", "App.js")
}

module.exports = {
	entry: {
		app: PATH.app,
		vendor: ["react", "react-dom", "react-router"]
	},
	output: {
		filename: "[name].js"
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname),
			"$tool": path.join(__dirname, "src", "js", "tool")
		},
		extensions: [".js", ".css"]
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: "babel-loader",
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader",
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ["vendor"]
		}),
		new webpack.ProvidePlugin({
		  React: 'react'
		})
	]

}