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
