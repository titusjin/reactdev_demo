webpackJsonp([1],{0:function(e,t,n){var o=n(9),r=n(96),i=n(95),a=n(90);o.render(o.createElement(r,null),document.getElementById("todoapp")),o.render(o.createElement(i,null),document.getElementById("example")),o.render(o.createElement(a,null),document.getElementById("banner"))},31:function(e,t,n){var o=n(18),r=n(32),i={create:function(e){console.log("In todoAction create method"),console.log("the TODOconstants TODO_CREATE is : "+r.TODO_CREATE),o.dispatch({actionType:r.TODO_CREATE,text:e})},updateText:function(e,t){o.dispatch({actionType:r.TODO_UPDATE_TEXT,id:e,text:t})},toggleComplete:function(e){var t=e.id,n=e.complete?r.TODO_UNDO_COMPLETE:r.TODO_COMPLETE;o.dispatch({actionType:n,id:t})},toggleCompleteAll:function(){o.dispatch({actionType:r.TODO_TOGGLE_COMPLETE_ALL})},destroy:function(e){o.dispatch({actionType:r.TODO_DESTROY,id:e})},destroyCompleted:function(){o.dispatch({actionType:r.TODO_DESTROY_COMPLETED})}};e.exports=i},32:function(e,t,n){var o=n(105);e.exports=o({TODO_CREATE:null,TODO_COMPLETE:null,TODO_DESTROY:null,TODO_DESTROY_COMPLETED:null,TODO_TOGGLE_COMPLETE_ALL:null,TODO_UNDO_COMPLETE:null,TODO_UPDATE_TEXT:null,SECONDMENU_TRIGGER:null})},64:function(e,t,n){var o=n(9),r=o.PropTypes,i=13,a=o.createClass({displayName:"TodoTextInput",propTypes:{className:r.string,id:r.string,placeholder:r.string,onSave:r.func.isRequired,value:r.string},getInitialState:function(){return{value:this.props.value||""}},render:function(){return o.createElement("input",{className:this.props.className,id:this.props.id,placeholder:this.props.placeholder,onBlur:this._save,onChange:this._onChange,onKeyDown:this._onKeyDown,value:this.state.value,autoFocus:!0})},_save:function(){console.log("the state.value is : "+this.state.value),this.props.onSave(this.state.value),this.setState({value:""})},_onChange:function(e){this.setState({value:e.target.value})},_onKeyDown:function(e){e.keyCode===i&&this._save()}});e.exports=a},89:function(e,t,n){"use strick";var o=n(18),r=n(32),i={changeSecondMenu:function(e){o.dispatch({eventName:r.SECONDMENU_TRIGGER,newItem:{item:e}})},sendMessage:function(e){o.dispatch({eventName:"bannerAdd",newItem:{item:e}})}};e.exports=i},90:function(e,t,n){var o=n(9),r=n(98),i=o.createClass({displayName:"Banner",getInitialState:function(){return{content:[]}},componentDidMount:function(){r.addChangeListener(this._onContentChange)},componentWillUnmount:function(){r.removeChangeListener(this._onContentChange)},_onContentChange:function(){this.setState(r.getData())},render:function(){var e=this.state.content.map(function(e){return o.createElement("div",null,o.createElement("span",{style:{color:"red"}},e))});return o.createElement("div",null,e)}});e.exports=i},92:function(e,t,n){var o=n(9),r=o.PropTypes,i=n(31),a=o.createClass({displayName:"Footer",propTypes:{allTodos:r.object.isRequired},render:function(){var e=this.props.allTodos,t=Object.keys(e).length;if(0===t)return null;var n=0;for(var r in e)e[r].complete&&n++;var i=t-n,a=1===i?" item ":" items ";a+="left";var s;return n&&(s=o.createElement("button",{id:"clear-completed",onClick:this._onClearCompletedClick},"Clear completed (",n,")")),o.createElement("footer",{id:"footer"},o.createElement("span",{id:"todo-count"},o.createElement("strong",null,i),a),s)},_onClearCompletedClick:function(){i.destroyCompleted()}});e.exports=a},93:function(e,t,n){var o=n(9),r=n(31),i=n(64),a=o.createClass({displayName:"Header",render:function(){return o.createElement("header",{id:"header"},o.createElement("h1",null,"todos"),o.createElement(i,{id:"new-todo",placeholder:"What needs to be done?",onSave:this._onSave}))},_onSave:function(e){e.trim()&&r.create(e)}});e.exports=a},94:function(e,t,n){var o=n(9),r=o.PropTypes,i=n(31),a=n(97),s=o.createClass({displayName:"MainSection",propTypes:{allTodos:r.object.isRequired,areAllComplete:r.bool.isRequired},render:function(){if(Object.keys(this.props.allTodos).length<1)return null;var e=this.props.allTodos,t=[];for(var n in e)t.push(o.createElement(a,{key:n,todo:e[n]}));return o.createElement("section",{id:"main"},o.createElement("input",{id:"toggle-all",type:"checkbox",onChange:this._onToggleCompleteAll,checked:this.props.areAllComplete?"checked":""}),o.createElement("label",{htmlFor:"toggle-all"},"Mark all as complete"),o.createElement("ul",{id:"todo-list"},t))},_onToggleCompleteAll:function(){i.toggleCompleteAll()}});e.exports=s},95:function(e,t,n){var o=n(9),r=n(100),i=n(89),a=o.createClass({displayName:"SecondaryMenu",getInitialState:function(){return r.getAll("Apple")},componentDidMount:function(){r.addChangeListener(this._onMenuChange)},componentWillUnmount:function(){r.removeChangeListener(this._onMenuChange)},_onMenuChange:function(){this.setState(r.getCurrent())},syncData:function(e){e.preventDefault(e);var t=o.findDOMNode(this.refs.firstSelect).value.trim();i.changeSecondMenu(t)},sendMessage:function(e){e.preventDefault(e);var t=o.findDOMNode(this.refs.secondSelect).value.trim();i.sendMessage([t])},render:function(){var e=this.state.firstData.map(function(e){return o.createElement("option",{value:e},e)}),t=this.state.secondData.map(function(e){return o.createElement("option",{value:e},e)});return o.createElement("div",null,o.createElement("h2",{style:{textAlign:"center"}},"Company"),o.createElement("div",{style:{textAlign:"center"}},o.createElement("select",{ref:"firstSelect",onChange:this.syncData},e)),o.createElement("h2",{style:{textAlign:"center"}},"Product"),o.createElement("div",{style:{textAlign:"center"}},o.createElement("select",{ref:"secondSelect",onChange:this.sendMessage},t)))}});e.exports=a},96:function(e,t,n){function o(){return{allTodos:u.getAll(),areAllComplete:u.areAllComplete()}}var r=n(9),i=n(92),a=n(93),s=n(94),u=n(101),c=r.createClass({displayName:"TodoApp",getInitialState:function(){return o()},componentDidMount:function(){u.addChangeListener(this._onChange)},componentWillUnmount:function(){u.removeChangeListener(this._onChange)},render:function(){return r.createElement("div",null,r.createElement(a,null),r.createElement(s,{allTodos:this.state.allTodos,areAllComplete:this.state.areAllComplete}),r.createElement(i,{allTodos:this.state.allTodos}))},_onChange:function(){this.setState(o())}});e.exports=c},97:function(e,t,n){var o=n(9),r=o.PropTypes,i=n(31),a=n(64),s=n(163),u=o.createClass({displayName:"TodoItem",propTypes:{todo:r.object.isRequired},getInitialState:function(){return{isEditing:!1}},render:function(){var e,t=this.props.todo;return this.state.isEditing&&(e=o.createElement(a,{className:"edit",onSave:this._onSave,value:t.text})),o.createElement("li",{className:s({completed:t.complete,editing:this.state.isEditing}),key:t.id},o.createElement("div",{className:"view"},o.createElement("input",{className:"toggle",type:"checkbox",checked:t.complete,onChange:this._onToggleComplete}),o.createElement("label",{onDoubleClick:this._onDoubleClick},t.text),o.createElement("button",{className:"destroy",onClick:this._onDestroyClick})),e)},_onToggleComplete:function(){i.toggleComplete(this.props.todo)},_onDoubleClick:function(){this.setState({isEditing:!0})},_onSave:function(e){i.updateText(this.props.todo.id,e),this.setState({isEditing:!1})},_onDestroyClick:function(){i.destroy(this.props.todo.id)}});e.exports=u},98:function(e,t,n){var o=n(18),r=n(33).EventEmitter,i=n(34),a=i({},r.prototype,{model:{content:[]},getData:function(){return this.model},addContent:function(e){this.model.content=this.model.content.concat(e)},emitChange:function(){this.emit("contentChange")},addChangeListener:function(e){this.on("contentChange",e)},removeChangeListener:function(e){this.removeListener("contentChange",e)}});o.register(function(e){switch(e.eventName){case"bannerAdd":a.addContent(e.newItem.item),a.emitChange()}}),e.exports=a},100:function(e,t,n){var o=n(18),r=n(33).EventEmitter,i=n(34),a=n(32),s={first:["Apple","HTC","Samsung"],second:{Apple:["iPhone5C","iPhone5S","iPhone6","iPhone6Plus"],HTC:["Desire820","ButteryFlyS","One_M9","One_E9"],Samsung:["GalaxyS6","GalaxyS6Edge","GalaxyNote3","GalaxyNote4","GalaxyNoteEdge"]}},u=function(e){return e?{firstData:s.first,secondData:s.second[e]}:{firstData:s.first,secondData:s.second.Apple}},c=null,l=i({},r.prototype,{getAll:function(e){return c=u(e)},getCurrent:function(){return c},changeSecondMenu:function(e){this.getAll(e)},emitChange:function(){this.emit("menuChange")},addChangeListener:function(e){this.on("menuChange",e)},removeChangeListener:function(e){this.removeListener("menuChange",e)}});o.register(function(e){switch(e.eventName){case a.SECONDMENU_TRIGGER:l.changeSecondMenu(e.newItem.item),l.emitChange()}}),e.exports=l},101:function(e,t,n){function o(e){var t=(+new Date+Math.floor(999999*Math.random())).toString(36);f[t]={id:t,complete:!1,text:e}}function r(e,t){f[e]=p({},f[e],t)}function i(e){for(var t in f)r(t,e)}function a(e){delete f[e]}function s(){for(var e in f)f[e].complete&&a(e)}var u=n(18),c=n(33).EventEmitter,l=n(32),p=n(34),d="change",f={},h=p({},c.prototype,{areAllComplete:function(){for(var e in f)if(!f[e].complete)return!1;return!0},getAll:function(){return f},emitChange:function(){this.emit(d)},addChangeListener:function(e){this.on(d,e)},removeChangeListener:function(e){this.removeListener(d,e)}});u.register(function(e){var t;switch(e.actionType){case l.TODO_CREATE:t=e.text.trim(),""!==t&&(o(t),h.emitChange());break;case l.TODO_TOGGLE_COMPLETE_ALL:i(h.areAllComplete()?{complete:!1}:{complete:!0}),h.emitChange();break;case l.TODO_UNDO_COMPLETE:r(e.id,{complete:!1}),h.emitChange();break;case l.TODO_COMPLETE:r(e.id,{complete:!0}),h.emitChange();break;case l.TODO_UPDATE_TEXT:t=e.text.trim(),""!==t&&(r(e.id,{text:t}),h.emitChange());break;case l.TODO_DESTROY:a(e.id),h.emitChange();break;case l.TODO_DESTROY_COMPLETED:s(),h.emitChange()}}),e.exports=h},105:function(e,t){"use strict";var n=function(e){var t,n={};if(!(e instanceof Object)||Array.isArray(e))throw new Error("keyMirror(...): Argument must be an object.");for(t in e)e.hasOwnProperty(t)&&(n[t]=t);return n};e.exports=n},163:function(e,t,n){(function(t){"use strict";function o(e){return"production"!==t.env.NODE_ENV&&("production"!==t.env.NODE_ENV?r(i,"React.addons.classSet will be deprecated in a future version. See http://fb.me/react-addons-classset"):null,i=!0),"object"==typeof e?Object.keys(e).filter(function(t){return e[t]}).join(" "):Array.prototype.join.call(arguments," ")}var r=n(5),i=!1;e.exports=o}).call(t,n(1))}});