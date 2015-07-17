var React = require('react');
var BannerStore = require('../stores/BannerStore');

var Banner = React.createClass({
	getInitialState : function(){
		return {content: []};
	},
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
		var data = this.state.content.map(function(node){
			return <div><span style={{color: 'red'}}>{node}</span></div>
		});
		return(
			<div>
				{data}
			</div>
		);
	}
});

module.exports = Banner;
