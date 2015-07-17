var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


module.exports = {
  entry: {
    webPack1 : './js/app.js',
    webPack2 : './js/app3.js'
  },
  output: {
  	path: './out',
    filename: '[name].js'      
  },
  module: {
  	loaders: [
  		{test: /\.js$/ , loader: 'jsx-loader?insertPragma=React.DOM&harmony'}
  	]
  },
  plugins: [commonsPlugin]
};
