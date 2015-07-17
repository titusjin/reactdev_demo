var AppDispatcher = require('../dispatcher/AppDispatcher');

var CommentBoxAction = {
	addNewComment : function(comment){
		AppDispatcher.dispatch({
        	eventName: 'commentAddNewComment',
        	newItem: { item: comment }
    	});		
	}
}

module.exports = CommentBoxAction;
