var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var BannerStore = assign({},EventEmitter.prototype,{
	model: {content: []},
	getData: function(){
		return this.model;
	},
	addContent: function(content){
		this.model.content = this.model.content.concat(content);
	},
	emitChange: function(){
		this.emit('contentChange');
	},
	addChangeListener: function(callback) {
    	this.on('contentChange', callback);
  	},
  	removeChangeListener: function(callback) {
    	this.removeListener('contentChange', callback);
  	}
});

AppDispatcher.register( function( payload ) {
    switch( payload.eventName ) {
        case 'bannerAdd':
            BannerStore.addContent(payload.newItem.item);
            
            //trigger view update after model is updated
            BannerStore.emitChange();
            break;
    }
}); 


module.exports = BannerStore;
