webpackJsonp([2],{0:function(e,t,n){"use strict";var r=n(9),o=n(91);r.render(r.createElement(o,null),document.getElementById("example"))},88:function(e,t,n){"use strict";var r=n(18),o={addNewComment:function(e){r.dispatch({eventName:"commentAddNewComment",newItem:{item:e}})}};e.exports=o},91:function(e,t,n){"use strict";var r=n(9),o=n(99),i=n(88),a=r.createClass({displayName:"CommentBox",getInitialState:function(){return o.getAllData()},componentDidMount:function(){o.addChangeListener("commentChange",this._onCommentChange)},componentWillUnmount:function(){o.removeChangeListener("commentChange",this._onCommentChange)},_onCommentChange:function(){this.setState(o.getAllData())},handleCommentSubmit:function(e){i.addNewComment(e)},handleCancelSubmit:function(e){e.preventDefault(),this.state.data.pop(),this.setState({data:this.state.data})},handleReset:function(e){e.preventDefault();var t=this.getInitialState();this.setState(t)},render:function(){return r.createElement("div",{className:"commentBox"},r.createElement("h1",null,"Comments"),r.createElement(s,{data:this.state.data}),r.createElement(l,{onCommentSubmit:this.handleCommentSubmit}),r.createElement("input",{type:"submit",value:"Reset",onClick:this.handleReset}),r.createElement(c,{onCancelSubmit:this.handleCancelSubmit}))}}),s=r.createClass({displayName:"CommentList",removeItem:function(e){o.removeComment(e)},render:function(){var e=this,t=this.props.data.map(function(t){return r.createElement(u,{author:t.author,text:t.text,triggerRemove:e.removeItem})});return r.createElement("div",{className:"commentList"},t)}}),u=r.createClass({displayName:"Comment",handleRemove:function(e){var t=e.target.getAttribute("data-key");this.props.triggerRemove(t)},render:function(){console.log("Comment render....");var e=this.props.author.toString();return r.createElement("div",{className:"comment"},r.createElement("h2",{className:"commentAuthor"},r.createElement("span",{dangerouslySetInnerHTML:{__html:e}})),this.props.text,r.createElement("button",{"data-key":this.props.author,type:"button",onClick:this.handleRemove},"remove"))}}),c=r.createClass({displayName:"CancelForm",render:function(){return r.createElement("form",{className:"commentForm",onSubmit:this.props.onCancelSubmit},r.createElement("input",{type:"submit",value:"remove last comment"}))}}),l=r.createClass({displayName:"CommentForm",handleSubmit:function(e){e.preventDefault();var t=this.refs.author.getDOMNode().value.trim(),n=this.refs.text.getDOMNode().value.trim();this.props.onCommentSubmit({author:t,text:n}),this.refs.author.getDOMNode().value="",this.refs.text.getDOMNode().value=""},render:function(){return r.createElement("form",{className:"commentForm",onSubmit:this.handleSubmit},r.createElement("input",{type:"text",placeholder:"Your name",ref:"author"}),r.createElement("br",null),r.createElement("input",{type:"text",placeholder:"Say something...",ref:"text"}),r.createElement("input",{type:"submit",value:"Post"}))}});e.exports=a},99:function(e,t,n){"use strict";var r=n(18),o=n(33).EventEmitter,i=n(34),a=i({},o.prototype,{model:[{author:"Pete Hunt",text:"This is one comment"},{author:"Jordan Walke",text:"This is *another* comment"}],getAllData:function(){return{data:this.model}},addNewComment:function(e){this.model=this.model.concat([e]),this.emitChange()},removeComment:function(e){for(var t=this.model.length;t--;)if(this.model[t].author==e){this.model.splice(t,1);break}this.emitChange()},emitChange:function(){this.emit("commentChange")},addChangeListener:function(e,t){this.on(e,t)},removeChangeListener:function(e,t){this.removeListener(e,t)}});r.register(function(e){switch(e.eventName){case"commentAddNewComment":a.addNewComment(e.newItem.item),a.emitChange()}}),e.exports=a}});