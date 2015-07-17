var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TodoConstants = require('../constants/TodoConstants');

var data = {
	first: ["Apple", "HTC","Samsung"],
	second: {
			Apple: ["iPhone5C", "iPhone5S","iPhone6","iPhone6Plus"],
			HTC : ["Desire820","ButteryFlyS","One_M9","One_E9"],
			Samsung: ["GalaxyS6","GalaxyS6Edge","GalaxyNote3","GalaxyNote4","GalaxyNoteEdge"]
	}
}

var getInput = function(selected){
  if(!selected){
    return {
      firstData: data.first,
      secondData: data.second.Apple
    }
  }else{
    return {
      firstData: data.first,
      secondData: data.second[selected]
    }
  }
}

var model = null;

var SecondaryMenuStore = assign({}, EventEmitter.prototype, {
	getAll: function(selected) {
      model =  getInput(selected);  
    	return model;
  },
  getCurrent: function(){
      return model;
  },
  changeSecondMenu: function(selected){
      this.getAll(selected);
  },
  emitChange : function(){
      this.emit('menuChange');
  },
  addChangeListener: function(callback) {
      this.on('menuChange', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('menuChange', callback);
  }
});

AppDispatcher.register( function( payload ) {
    switch( payload.eventName ) {
        case TodoConstants.SECONDMENU_TRIGGER:
            SecondaryMenuStore.changeSecondMenu(payload.newItem.item);
            //trigger view update after model is updated
            SecondaryMenuStore.emitChange();
            break;
    }
}); 

module.exports = SecondaryMenuStore;
