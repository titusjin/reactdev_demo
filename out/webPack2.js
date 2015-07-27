webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var CommentBox = __webpack_require__(34);

	React.render(React.createElement(CommentBox, null), document.getElementById('example'));

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var CommentBoxStore = __webpack_require__(35);
	var CommentBoxAction = __webpack_require__(36);

	var CommentBox = React.createClass({
	  displayName: 'CommentBox',

	  getInitialState: function getInitialState() {
	    return CommentBoxStore.getAllData();
	  },
	  componentDidMount: function componentDidMount() {
	    CommentBoxStore.addChangeListener('commentChange', this._onCommentChange);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    CommentBoxStore.removeChangeListener('commentChange', this._onCommentChange);
	  },
	  _onCommentChange: function _onCommentChange() {
	    this.setState(CommentBoxStore.getAllData());
	  },
	  /*
	    User trigger action  
	  */
	  handleCommentSubmit: function handleCommentSubmit(comment) {
	    // calling action to trigger dispatcher
	    CommentBoxAction.addNewComment(comment);
	  },
	  handleCancelSubmit: function handleCancelSubmit(e) {
	    e.preventDefault();
	    this.state.data.pop();
	    this.setState({ data: this.state.data });
	  },
	  handleReset: function handleReset(e) {
	    e.preventDefault();
	    var initialState = this.getInitialState();
	    this.setState(initialState);
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'commentBox' },
	      React.createElement(
	        'h1',
	        null,
	        'Comments'
	      ),
	      React.createElement(CommentList, { data: this.state.data }),
	      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit }),
	      React.createElement('input', { type: 'submit', value: 'Reset', onClick: this.handleReset }),
	      React.createElement(CancelForm, { onCancelSubmit: this.handleCancelSubmit })
	    );
	  }
	});

	var CommentList = React.createClass({
	  displayName: 'CommentList',

	  // removeItem: function(selectId){
	  //   for(var i = this.props.data.length  ; i-- ; ){
	  //   console.log(this.props.data[i].author);

	  //   if(this.props.data[i].author == selectId){
	  //       this.props.data.splice(i,1);
	  //       break;
	  //     }
	  //   }
	  //   this.setState(this.props.data);
	  // },
	  removeItem: function removeItem(selectId) {
	    CommentBoxStore.removeComment(selectId);
	  },
	  render: function render() {
	    var self = this;
	    var commentNodes = this.props.data.map(function (comment) {
	      return React.createElement(Comment, { author: comment.author, text: comment.text, triggerRemove: self.removeItem });
	    });
	    return React.createElement(
	      'div',
	      { className: 'commentList' },
	      commentNodes
	    );
	  }
	});

	var Comment = React.createClass({
	  displayName: 'Comment',

	  handleRemove: function handleRemove(e) {
	    var targetId = e.target.getAttribute('data-key');
	    this.props.triggerRemove(targetId);
	  },
	  render: function render() {
	    console.log('Comment render....');

	    var rawMarkup = this.props.author.toString();
	    return React.createElement(
	      'div',
	      { className: 'comment' },
	      React.createElement(
	        'h2',
	        { className: 'commentAuthor' },
	        React.createElement('span', { dangerouslySetInnerHTML: { __html: rawMarkup } })
	      ),
	      this.props.text,
	      React.createElement(
	        'button',
	        { 'data-key': this.props.author, type: 'button', onClick: this.handleRemove },
	        'remove'
	      )
	    );
	  }
	});

	var CancelForm = React.createClass({
	  displayName: 'CancelForm',

	  render: function render() {
	    return React.createElement(
	      'form',
	      { className: 'commentForm', onSubmit: this.props.onCancelSubmit },
	      React.createElement('input', { type: 'submit', value: 'remove last comment' })
	    );
	  }
	});

	var CommentForm = React.createClass({
	  displayName: 'CommentForm',

	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    var author = this.refs.author.getDOMNode().value.trim();
	    var text = this.refs.text.getDOMNode().value.trim();

	    this.props.onCommentSubmit({ author: author, text: text });

	    this.refs.author.getDOMNode().value = '';
	    this.refs.text.getDOMNode().value = '';
	  },
	  render: function render() {
	    return React.createElement(
	      'form',
	      { className: 'commentForm', onSubmit: this.handleSubmit },
	      React.createElement('input', { type: 'text', placeholder: 'Your name', ref: 'author' }),
	      React.createElement('br', null),
	      React.createElement('input', { type: 'text', placeholder: 'Say something...', ref: 'text' }),
	      React.createElement('input', { type: 'submit', value: 'Post' })
	    );
	  }
	});

	module.exports = CommentBox;

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(4);
	var EventEmitter = __webpack_require__(8).EventEmitter;
	var assign = __webpack_require__(9);

	var CommentBoxStore = assign({}, EventEmitter.prototype, {
		model: [{ author: 'Pete Hunt', text: 'This is one comment' }, { author: 'Jordan Walke', text: 'This is *another* comment' }],
		getAllData: function getAllData() {
			return { data: this.model };
		},
		addNewComment: function addNewComment(comment) {
			this.model = this.model.concat([comment]);
			this.emitChange();
		},
		removeComment: function removeComment(selectId) {
			for (var i = this.model.length; i--;) {
				if (this.model[i].author == selectId) {
					this.model.splice(i, 1);
					break;
				}
			}
			this.emitChange();
		},
		emitChange: function emitChange() {
			this.emit('commentChange');
		},
		addChangeListener: function addChangeListener(eventName, callback) {
			this.on(eventName, callback);
		},
		removeChangeListener: function removeChangeListener(eventName, callback) {
			this.removeListener(eventName, callback);
		}
	});

	AppDispatcher.register(function (payload) {
		switch (payload.eventName) {
			case 'commentAddNewComment':
				CommentBoxStore.addNewComment(payload.newItem.item);

				//trigger view update after model is updated
				CommentBoxStore.emitChange();
				break;
		}
	});

	module.exports = CommentBoxStore;

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(4);

	var CommentBoxAction = {
	  addNewComment: function addNewComment(comment) {
	    AppDispatcher.dispatch({
	      eventName: 'commentAddNewComment',
	      newItem: { item: comment }
	    });
	  }
	};

	module.exports = CommentBoxAction;

/***/ }

});