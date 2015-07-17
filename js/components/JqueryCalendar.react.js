var React = require('react');
var BannerStore = require('../stores/BannerStore');


React.createClass({
	componentDidMount : function(){
		BannerStore.addChangeListener(this._onContentChange);
	},
	componentWillUnmount: function () {
		BannerStore.removeChangeListener(this._onContentChange);
	},
	_onContentChange: function(){
		this.setState(BannerStore.getData());
	},
	render: function(){
		
	}
});