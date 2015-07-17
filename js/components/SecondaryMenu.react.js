var React = require('react');
var SecondaryMenuStore = require('../stores/SecondaryMenuStore');
var SecondaryMenuAction = require('../actions/SecondMenuAction');


var SecondaryMenu = React.createClass({
	getInitialState: function() {
		return SecondaryMenuStore.getAll('Apple');
	},
    componentDidMount : function(){
    	SecondaryMenuStore.addChangeListener(this._onMenuChange);
	},
	componentWillUnmount : function(){
		SecondaryMenuStore.removeChangeListener(this._onMenuChange);	
	},
	_onMenuChange : function(){
		this.setState(SecondaryMenuStore.getCurrent());
	},
	// User trigger action
	syncData: function(e){
		e.preventDefault(e);
		var selected = React.findDOMNode(this.refs.firstSelect).value.trim();

		//Action to trigger dispatcher
		SecondaryMenuAction.changeSecondMenu(selected);
	},
	sendMessage: function(e){
		e.preventDefault(e);
		var value = React.findDOMNode(this.refs.secondSelect).value.trim();

		SecondaryMenuAction.sendMessage([value]);
	},
  	render: function() {
		var option1 = this.state.firstData.map(function(nodeData){
			return <option value={nodeData}>{nodeData}</option>
		});
		var option2 = this.state.secondData.map(function(nodeData){
			return <option value={nodeData}>{nodeData}</option>
		});
    	return (
      		<div>
        		<h2 style={{textAlign: 'center'}}>Company</h2>
        		<div style={{textAlign:'center'}}>
					<select ref="firstSelect" onChange={this.syncData}>
						{option1}
					</select>
				</div>
        		<h2 style={{textAlign: 'center'}}>Product</h2>
				<div style={{textAlign:'center'}}>
					<select ref="secondSelect" onChange={this.sendMessage}>
						{option2}
					</select>
				</div>
      		</div>
    	);
  	}
});

module.exports = SecondaryMenu;
