var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  // single entry is like : entry: "./js/app"
  entry: {
    webPack1 : './js/app',
    webPack2 : './js/app3'
  },
  // for multi entries we can use [name] for different bundle
  output: {
  	path: './out',
    filename: '[name].js'    
  },
  module: {
  	loaders: [
/*    To transfer jsx into pure js, we can use jsx-loader or babel-loader
  		{test: /\.js$/ , loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
*/    
      {test: /\.js$/, loader: 'babel-loader'},

/*    To make the css as one js module that can be import by using require(xxx.css) 
      we need style-loader pipe with css-loader with the symbol "!"
*/      
      {test: /\.css$/, loaders:  ["style", "css"]},

/*    url-loader will taking care of the png/jpg...etc files inside ur css file
      according to the limit of data-url , we add the limit 8192       
      For better understanding of the url-loader, visit the official site: https://github.com/webpack/url-loader
*/      
      {test: /\.jpg$/, loader: "url-loader?limit=8192"},
      {test: /\.png$/, loader: "file?name=images/[hash].[ext]"}
  	]
  },
  resolve: {
    // you can now require('fileName') instead of require('file.coffee') or require('file.js')...etc.
    extensions: ['', '.js', '.json', '.coffee'] 
  },
  externals: {
      //don't bundle the 'react' npm package with our bundle.js
      //but get it from a global 'React' variable
      'react': 'React'
  },
  // commonsPlugin can abstract common js code out of ur entries
  plugins: [commonsPlugin]
};
