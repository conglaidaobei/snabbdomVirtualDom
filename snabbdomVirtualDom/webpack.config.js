const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
      //虚拟打包路径    要用
      publicPath:'/xuni', //  最前面加不加 /都不影响
    filename: 'bundle.js'
  },
  devServer:{
      port:8080,
      //静态资源文件夹
      contentBase:'www'
  }
};