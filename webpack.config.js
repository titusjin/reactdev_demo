var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


module.exports = {
  entry: {
    webPack1 : './js/app',
    webPack2 : './js/app3'
  },
  output: {
  	path: './out',
    filename: '[name].js'      
  },
  module: {
  	loaders: [
  		// {test: /\.js$/ , loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
      {test: /\.js$/, loader: 'babel-loader'}
  	]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee'] 
  },
  plugins: [commonsPlugin]
};
