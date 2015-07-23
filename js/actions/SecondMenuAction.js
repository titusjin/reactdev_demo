'use strick';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var SecondaryMenuAction = {
	changeSecondMenu : function(selected){
		AppDispatcher.dispatch({
        	eventName: TodoConstants.SECONDMENU_TRIGGER,
        	newItem: { item: selected}
    	});		
	},
	sendMessage: function(data){
		AppDispatcher.dispatch({
        	eventName: 'bannerAdd',
        	newItem: {	item: data ,
						refDispatcher : AppDispatcher
        			}
    	});			
	}
}

module.exports = SecondaryMenuAction;
