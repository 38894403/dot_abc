

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const entry = require('./webpack/entry.webpack.js');
const copyWebpackPlugin = require('copy-webpack-plugin');

console.log(encodeURIComponent(process.env.type),'========================')

if(process.env.type=="build"){
	var website = {
		publicPath:'http://192.168.1.75:1717/'
	}
}else{
	var website = {
		publicPath:'http://192.168.1.75:1717/'
	}
}



module.exports={
	// devtool:'eval-source-map',
	entry:entry.path,
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
					use:[
						{loader:'css-loader',options:{importLoaders:1}},
						'postcss-loader'
					]
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
			},{
				test:/\.less$/,
				use:extractTextPlugin.extract({
					use:[{
						loader:'css-loader'
					},{
						loader:'less-loader'
					}],
					fallback:'style-loader'
				})
			},{
				test:/\.scss$/,
				use:extractTextPlugin.extract({
					fallback:'style-loader',
					use:[{
						loader:'css-loader',
						options:{importLoaders:1}
					},{
						loader:'sass-loader'
					},
					'postcss-loader']
				})
			},{
				test:/\.(jsx|js)$/,
				use:{
						loader:'babel-loader'
				},
				exclude:'/node_modules/'
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
		new extractTextPlugin('css/index.css'),
		new PurifyCSSPlugin({
			paths:glob.sync(path.join(__dirname,'src/*.html'))
		}),
		new webpack.ProvidePlugin({
			$:'jquery'
		}),
		new webpack.BannerPlugin("create by 37928"),
		new webpack.optimize.CommonsChunkPlugin({
			name:['jquery','vue','zc'],
			filename:'assets/js/[name].js', //[name].[ext] 同时识别扩展名
			minChunks:2
		}),
		new copyWebpackPlugin([{
			from:__dirname+'/src/public',
			to:'./public'
		}]),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.1.75',
		compress:true, 	//服务器压缩，有空自学
		port:1717
	},
	watchOptions:{
		poll:1000,
		agg:500,	//处理重复按键
		ignored:/node_modules/
	}
}