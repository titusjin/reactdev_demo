var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');



var CommentBoxStore = assign({},EventEmitter.prototype,{
	model : [
		{author: "Pete Hunt", text: "This is one comment"},
		{author: "Jordan Walke", text: "This is *another* comment"}
	],
	getAllData : function(){
		return {data: this.model};
	},
	addNewComment : function(comment){
    	this.model = this.model.concat([comment]);
    	this.emitChange();
	},
	removeComment : function(selectId){
		for(var i = this.model.length  ; i-- ; ){
			if(this.model[i].author == selectId){
				this.model.splice(i,1);
				break;
			}
    	}
    	this.emitChange();
	},
	emitChange: function(){
		this.emit('commentChange');
	},
	addChangeListener: function(eventName,callback) {
		this.on(eventName, callback);
  	},
 	removeChangeListener: function(eventName,callback) {
		this.removeListener(eventName, callback);
	}
});

AppDispatcher.register( function( payload ) {
    switch( payload.eventName ) {
        case 'commentAddNewComment':
            CommentBoxStore.addNewComment(payload.newItem.item);
            
            //trigger view update after model is updated
            CommentBoxStore.emitChange();
            break;
    }
}); 

module.exports = CommentBoxStore;
