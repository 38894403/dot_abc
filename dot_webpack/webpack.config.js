

const path = require('path');
module.exports={
	entry:{
		entry:'./src/entry.js',
		entry2:'./src/entry2.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
		]
	},
	plugins:[],
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.1.75',
		compress:true, 	//服务器压缩，有空自学
		port:1717
	}
}