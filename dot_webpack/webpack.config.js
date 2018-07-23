

const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");


var website = {
	publicPath:'http://192.168.1.75:1717/'
}

module.exports={
	entry:{
		entry:'./src/entry.js',
		entry2:'./src/entry2.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js',
		publicPath:website.publicPath
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:extractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			},{
				test:/\.(png|jpg|gif)/,
				use:[{
					loader:'url-loader',
					options:{
						limit:500,
						outputPath:'images/'
					}
				}]
			},{
				test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
			}
		]
	},
	plugins:[
		// new uglify(),
		new htmlPlugin({
			minify:{
				removeAttributeQuotes:true,//去掉属性的引号
			},
			hash:true,
			template:'./src/index.html'
		}),
		new extractTextPlugin('css/index.css')
	],
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.1.75',
		compress:true, 	//服务器压缩，有空自学
		port:1717
	}
}