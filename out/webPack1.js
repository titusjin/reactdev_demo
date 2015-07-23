webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var React = __webpack_require__(2);

	var TodoApp = __webpack_require__(165);
	var SecondaryMenu = __webpack_require__(176);
	var Banner = __webpack_require__(1);

	// This is where we have to put our css file after using style-loader!css-loader with webpack
	__webpack_require__(179);
	__webpack_require__(184);

	React.render(React.createElement(TodoApp, null), document.getElementById('todoapp'));

	React.render(React.createElement(SecondaryMenu, null), document.getElementById('example'));

	React.render(React.createElement(Banner, null), document.getElementById('banner'));

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var BannerStore = __webpack_require__(158);

	var Banner = React.createClass({
		displayName: 'Banner',

		getInitialState: function getInitialState() {
			return { content: [] };
		},
		componentDidMount: function componentDidMount() {
			BannerStore.addChangeListener(this._onContentChange);
		},
		componentWillUnmount: function componentWillUnmount() {
			BannerStore.removeChangeListener(this._onContentChange);
		},
		_onContentChange: function _onContentChange() {
			this.setState(BannerStore.getData());
		},
		render: function render() {
			var data = this.state.content.map(function (node) {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'span',
						{ style: { color: 'red' } },
						node
					)
				);
			});
			return React.createElement(
				'div',
				null,
				data
			);
		}
	});

	module.exports = Banner;

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(159);
	var EventEmitter = __webpack_require__(163).EventEmitter;
	var assign = __webpack_require__(164);

	var BannerStore = assign({}, EventEmitter.prototype, {
	  model: { content: [] },
	  getData: function getData() {
	    return this.model;
	  },
	  addContent: function addContent(content) {
	    this.model.content = this.model.content.concat(content);
	  },
	  emitChange: function emitChange() {
	    this.emit('contentChange');
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on('contentChange', callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener('contentChange', callback);
	  }
	});

	AppDispatcher.register(function (payload) {
	  switch (payload.eventName) {
	    case 'bannerAdd':
	      BannerStore.addContent(payload.newItem.item);
	      console.log(payload.newItem.refDispatcher == AppDispatcher);

	      //trigger view update after model is updated
	      BannerStore.emitChange();
	      break;
	  }
	});

	module.exports = BannerStore;

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	/**
	 * This component operates as a "Controller-View".  It listens for changes in
	 * the TodoStore and passes the new data to its children.
	 */

	'use strict';

	var React = __webpack_require__(2);
	var Footer = __webpack_require__(166);
	var Header = __webpack_require__(170);
	var MainSection = __webpack_require__(172);

	var TodoStore = __webpack_require__(175);

	/**
	 * Retrieve the current TODO data from the TodoStore
	 */
	function getTodoState() {
	  return {
	    allTodos: TodoStore.getAll(),
	    areAllComplete: TodoStore.areAllComplete()
	  };
	}

	var TodoApp = React.createClass({
	  displayName: 'TodoApp',

	  getInitialState: function getInitialState() {
	    return getTodoState();
	  },

	  componentDidMount: function componentDidMount() {
	    TodoStore.addChangeListener(this._onChange);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    TodoStore.removeChangeListener(this._onChange);
	  },

	  /**
	   * @return {object}
	   */
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Header, null),
	      React.createElement(MainSection, {
	        allTodos: this.state.allTodos,
	        areAllComplete: this.state.areAllComplete
	      }),
	      React.createElement(Footer, { allTodos: this.state.allTodos })
	    );
	  },

	  /**
	   * Event handler for 'change' events coming from the TodoStore
	   */
	  _onChange: function _onChange() {
	    this.setState(getTodoState());
	  }
	});

	module.exports = TodoApp;

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var React = __webpack_require__(2);
	var ReactPropTypes = React.PropTypes;
	var TodoActions = __webpack_require__(167);

	var Footer = React.createClass({
	  displayName: 'Footer',

	  propTypes: {
	    allTodos: ReactPropTypes.object.isRequired
	  },

	  /**
	   * @return {object}
	   */
	  render: function render() {
	    var allTodos = this.props.allTodos;
	    var total = Object.keys(allTodos).length;

	    if (total === 0) {
	      return null;
	    }

	    var completed = 0;
	    for (var key in allTodos) {
	      if (allTodos[key].complete) {
	        completed++;
	      }
	    }

	    var itemsLeft = total - completed;
	    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
	    itemsLeftPhrase += 'left';

	    // Undefined and thus not rendered if no completed items are left.
	    var clearCompletedButton;
	    if (completed) {
	      clearCompletedButton = React.createElement(
	        'button',
	        {
	          id: 'clear-completed',
	          onClick: this._onClearCompletedClick },
	        'Clear completed (',
	        completed,
	        ')'
	      );
	    }

	    return React.createElement(
	      'footer',
	      { id: 'footer' },
	      React.createElement(
	        'span',
	        { id: 'todo-count' },
	        React.createElement(
	          'strong',
	          null,
	          itemsLeft
	        ),
	        itemsLeftPhrase
	      ),
	      clearCompletedButton
	    );
	  },

	  /**
	   * Event handler to delete all completed TODOs
	   */
	  _onClearCompletedClick: function _onClearCompletedClick() {
	    TodoActions.destroyCompleted();
	  }

	});

	module.exports = Footer;

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * TodoActions
	 */

	'use strict';

	var AppDispatcher = __webpack_require__(159);
	var TodoConstants = __webpack_require__(168);

	var TodoActions = {

	  /**
	   * @param  {string} text
	   */
	  create: function create(text) {
	    console.log('In todoAction create method');
	    console.log('the TODOconstants TODO_CREATE is : ' + TodoConstants.TODO_CREATE);

	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_CREATE,
	      text: text
	    });
	  },

	  /**
	   * @param  {string} id The ID of the ToDo item
	   * @param  {string} text
	   */
	  updateText: function updateText(id, text) {
	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_UPDATE_TEXT,
	      id: id,
	      text: text
	    });
	  },

	  /**
	   * Toggle whether a single ToDo is complete
	   * @param  {object} todo
	   */
	  toggleComplete: function toggleComplete(todo) {
	    var id = todo.id;
	    var actionType = todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE;

	    AppDispatcher.dispatch({
	      actionType: actionType,
	      id: id
	    });
	  },

	  /**
	   * Mark all ToDos as complete
	   */
	  toggleCompleteAll: function toggleCompleteAll() {
	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
	    });
	  },

	  /**
	   * @param  {string} id
	   */
	  destroy: function destroy(id) {
	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_DESTROY,
	      id: id
	    });
	  },

	  /**
	   * Delete all the completed ToDos
	   */
	  destroyCompleted: function destroyCompleted() {
	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_DESTROY_COMPLETED
	    });
	  }

	};

	module.exports = TodoActions;

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * TodoConstants
	 */

	'use strict';

	var keyMirror = __webpack_require__(169);

	module.exports = keyMirror({
	  TODO_CREATE: null,
	  TODO_COMPLETE: null,
	  TODO_DESTROY: null,
	  TODO_DESTROY_COMPLETED: null,
	  TODO_TOGGLE_COMPLETE_ALL: null,
	  TODO_UNDO_COMPLETE: null,
	  TODO_UPDATE_TEXT: null,
	  SECONDMENU_TRIGGER: null
	});

/***/ },

/***/ 169:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error("keyMirror(...): Argument must be an object.");
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var React = __webpack_require__(2);
	var TodoActions = __webpack_require__(167);
	var TodoTextInput = __webpack_require__(171);

	var Header = React.createClass({
	  displayName: 'Header',

	  /**
	   * @return {object}
	   */
	  render: function render() {
	    return React.createElement(
	      'header',
	      { id: 'header' },
	      React.createElement(
	        'h1',
	        null,
	        'todos'
	      ),
	      React.createElement(TodoTextInput, {
	        id: 'new-todo',
	        placeholder: 'What needs to be done?',
	        onSave: this._onSave
	      })
	    );
	  },

	  /**
	   * Event hnadler called within TodoTextInput.
	   * Defining this here allows TodoTextInput to be used in multiple places
	   * in different ways.
	   * @param {string} text
	   */
	  _onSave: function _onSave(text) {
	    if (text.trim()) {
	      TodoActions.create(text);
	    }
	  }

	});

	module.exports = Header;

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var React = __webpack_require__(2);
	var ReactPropTypes = React.PropTypes;

	var ENTER_KEY_CODE = 13;

	var TodoTextInput = React.createClass({
	  displayName: 'TodoTextInput',

	  propTypes: {
	    className: ReactPropTypes.string,
	    id: ReactPropTypes.string,
	    placeholder: ReactPropTypes.string,
	    onSave: ReactPropTypes.func.isRequired,
	    value: ReactPropTypes.string
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: this.props.value || ''
	    };
	  },

	  /**
	   * @return {object}
	   */
	  render: function render() /*object*/{
	    return React.createElement('input', {
	      className: this.props.className,
	      id: this.props.id,
	      placeholder: this.props.placeholder,
	      onBlur: this._save,
	      onChange: this._onChange,
	      onKeyDown: this._onKeyDown,
	      value: this.state.value,
	      autoFocus: true
	    });
	  },

	  /**
	   * Invokes the callback passed in as onSave, allowing this component to be
	   * used in different ways.
	   */
	  _save: function _save() {
	    console.log('the state.value is : ' + this.state.value);

	    this.props.onSave(this.state.value);
	    this.setState({
	      value: ''
	    });
	  },

	  /**
	   * @param {object} event
	   */
	  _onChange: function _onChange( /*object*/event) {
	    this.setState({
	      value: event.target.value
	    });
	  },

	  /**
	   * @param  {object} event
	   */
	  _onKeyDown: function _onKeyDown(event) {
	    if (event.keyCode === ENTER_KEY_CODE) {
	      this._save();
	    }
	  }

	});

	module.exports = TodoTextInput;

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var React = __webpack_require__(2);
	var ReactPropTypes = React.PropTypes;
	var TodoActions = __webpack_require__(167);
	var TodoItem = __webpack_require__(173);

	var MainSection = React.createClass({
	  displayName: 'MainSection',

	  propTypes: {
	    allTodos: ReactPropTypes.object.isRequired,
	    areAllComplete: ReactPropTypes.bool.isRequired
	  },

	  /**
	   * @return {object}
	   */
	  render: function render() {
	    // This section should be hidden by default
	    // and shown when there are todos.
	    if (Object.keys(this.props.allTodos).length < 1) {
	      return null;
	    }

	    var allTodos = this.props.allTodos;
	    var todos = [];

	    for (var key in allTodos) {
	      todos.push(React.createElement(TodoItem, { key: key, todo: allTodos[key] }));
	    }

	    return React.createElement(
	      'section',
	      { id: 'main' },
	      React.createElement('input', {
	        id: 'toggle-all',
	        type: 'checkbox',
	        onChange: this._onToggleCompleteAll,
	        checked: this.props.areAllComplete ? 'checked' : ''
	      }),
	      React.createElement(
	        'label',
	        { htmlFor: 'toggle-all' },
	        'Mark all as complete'
	      ),
	      React.createElement(
	        'ul',
	        { id: 'todo-list' },
	        todos
	      )
	    );
	  },

	  /**
	   * Event handler to mark all TODOs as complete
	   */
	  _onToggleCompleteAll: function _onToggleCompleteAll() {
	    TodoActions.toggleCompleteAll();
	  }

	});

	module.exports = MainSection;

/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var React = __webpack_require__(2);
	var ReactPropTypes = React.PropTypes;
	var TodoActions = __webpack_require__(167);
	var TodoTextInput = __webpack_require__(171);

	var cx = __webpack_require__(174);

	var TodoItem = React.createClass({
	  displayName: 'TodoItem',

	  propTypes: {
	    todo: ReactPropTypes.object.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isEditing: false
	    };
	  },

	  /**
	   * @return {object}
	   */
	  render: function render() {
	    var todo = this.props.todo;

	    var input;
	    if (this.state.isEditing) {
	      input = React.createElement(TodoTextInput, {
	        className: 'edit',
	        onSave: this._onSave,
	        value: todo.text
	      });
	    }

	    // List items should get the class 'editing' when editing
	    // and 'completed' when marked as completed.
	    // Note that 'completed' is a classification while 'complete' is a state.
	    // This differentiation between classification and state becomes important
	    // in the naming of view actions toggleComplete() vs. destroyCompleted().
	    return React.createElement(
	      'li',
	      {
	        className: cx({
	          'completed': todo.complete,
	          'editing': this.state.isEditing
	        }),
	        key: todo.id },
	      React.createElement(
	        'div',
	        { className: 'view' },
	        React.createElement('input', {
	          className: 'toggle',
	          type: 'checkbox',
	          checked: todo.complete,
	          onChange: this._onToggleComplete
	        }),
	        React.createElement(
	          'label',
	          { onDoubleClick: this._onDoubleClick },
	          todo.text
	        ),
	        React.createElement('button', { className: 'destroy', onClick: this._onDestroyClick })
	      ),
	      input
	    );
	  },

	  _onToggleComplete: function _onToggleComplete() {
	    TodoActions.toggleComplete(this.props.todo);
	  },

	  _onDoubleClick: function _onDoubleClick() {
	    this.setState({ isEditing: true });
	  },

	  /**
	   * Event handler called within TodoTextInput.
	   * Defining this here allows TodoTextInput to be used in multiple places
	   * in different ways.
	   * @param  {string} text
	   */
	  _onSave: function _onSave(text) {
	    TodoActions.updateText(this.props.todo.id, text);
	    this.setState({ isEditing: false });
	  },

	  _onDestroyClick: function _onDestroyClick() {
	    TodoActions.destroy(this.props.todo.id);
	  }

	});

	module.exports = TodoItem;

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */

	"use strict";
	var warning = __webpack_require__(16);

	var warned = false;

	function cx(classNames) {
	  if ("production" !== process.env.NODE_ENV) {
	    "production" !== process.env.NODE_ENV ? warning(warned, "React.addons.classSet will be deprecated in a future version. See " + "http://fb.me/react-addons-classset") : null;
	    warned = true;
	  }

	  if (typeof classNames == "object") {
	    return Object.keys(classNames).filter(function (className) {
	      return classNames[className];
	    }).join(" ");
	  } else {
	    return Array.prototype.join.call(arguments, " ");
	  }
	}

	module.exports = cx;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * TodoStore
	 */

	'use strict';

	var AppDispatcher = __webpack_require__(159);
	var EventEmitter = __webpack_require__(163).EventEmitter;
	var TodoConstants = __webpack_require__(168);
	var assign = __webpack_require__(164);

	var CHANGE_EVENT = 'change';

	var _todos = {};

	/**
	 * Create a TODO item.
	 * @param  {string} text The content of the TODO
	 */
	function create(text) {
	  // Hand waving here -- not showing how this interacts with XHR or persistent
	  // server-side storage.
	  // Using the current timestamp + random number in place of a real id.
	  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	  _todos[id] = {
	    id: id,
	    complete: false,
	    text: text
	  };
	}

	/**
	 * Update a TODO item.
	 * @param  {string} id
	 * @param {object} updates An object literal containing only the data to be
	 *     updated.
	 */
	function update(id, updates) {
	  _todos[id] = assign({}, _todos[id], updates);
	}

	/**
	 * Update all of the TODO items with the same object.
	 *     the data to be updated.  Used to mark all TODOs as completed.
	 * @param  {object} updates An object literal containing only the data to be
	 *     updated.

	 */
	function updateAll(updates) {
	  for (var id in _todos) {
	    update(id, updates);
	  }
	}

	/**
	 * Delete a TODO item.
	 * @param  {string} id
	 */
	function destroy(id) {
	  delete _todos[id];
	}

	/**
	 * Delete all the completed TODO items.
	 */
	function destroyCompleted() {
	  for (var id in _todos) {
	    if (_todos[id].complete) {
	      destroy(id);
	    }
	  }
	}

	var TodoStore = assign({}, EventEmitter.prototype, {

	  /**
	   * Tests whether all the remaining TODO items are marked as completed.
	   * @return {boolean}
	   */
	  areAllComplete: function areAllComplete() {
	    for (var id in _todos) {
	      if (!_todos[id].complete) {
	        return false;
	      }
	    }
	    return true;
	  },

	  /**
	   * Get the entire collection of TODOs.
	   * @return {object}
	   */
	  getAll: function getAll() {
	    return _todos;
	  },

	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },

	  /**
	   * @param {function} callback
	   */
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },

	  /**
	   * @param {function} callback
	   */
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});

	// Register callback to handle all updates
	AppDispatcher.register(function (action) {
	  var text;

	  switch (action.actionType) {
	    case TodoConstants.TODO_CREATE:
	      text = action.text.trim();
	      if (text !== '') {
	        create(text);
	        TodoStore.emitChange();
	      }
	      break;

	    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
	      if (TodoStore.areAllComplete()) {
	        updateAll({ complete: false });
	      } else {
	        updateAll({ complete: true });
	      }
	      TodoStore.emitChange();
	      break;

	    case TodoConstants.TODO_UNDO_COMPLETE:
	      update(action.id, { complete: false });
	      TodoStore.emitChange();
	      break;

	    case TodoConstants.TODO_COMPLETE:
	      update(action.id, { complete: true });
	      TodoStore.emitChange();
	      break;

	    case TodoConstants.TODO_UPDATE_TEXT:
	      text = action.text.trim();
	      if (text !== '') {
	        update(action.id, { text: text });
	        TodoStore.emitChange();
	      }
	      break;

	    case TodoConstants.TODO_DESTROY:
	      destroy(action.id);
	      TodoStore.emitChange();
	      break;

	    case TodoConstants.TODO_DESTROY_COMPLETED:
	      destroyCompleted();
	      TodoStore.emitChange();
	      break;

	    default:
	    // no op
	  }
	});

	module.exports = TodoStore;

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var SecondaryMenuStore = __webpack_require__(177);
	var SecondaryMenuAction = __webpack_require__(178);

	var SecondaryMenu = React.createClass({
		displayName: 'SecondaryMenu',

		getInitialState: function getInitialState() {
			return SecondaryMenuStore.getAll('Apple');
		},
		componentDidMount: function componentDidMount() {
			SecondaryMenuStore.addChangeListener(this._onMenuChange);
		},
		componentWillUnmount: function componentWillUnmount() {
			SecondaryMenuStore.removeChangeListener(this._onMenuChange);
		},
		_onMenuChange: function _onMenuChange() {
			this.setState(SecondaryMenuStore.getCurrent());
		},
		// User trigger action
		syncData: function syncData(e) {
			e.preventDefault(e);
			var selected = React.findDOMNode(this.refs.firstSelect).value.trim();

			//Action to trigger dispatcher
			SecondaryMenuAction.changeSecondMenu(selected);
		},
		sendMessage: function sendMessage(e) {
			e.preventDefault(e);
			var value = React.findDOMNode(this.refs.secondSelect).value.trim();

			SecondaryMenuAction.sendMessage([value]);
		},
		render: function render() {
			var option1 = this.state.firstData.map(function (nodeData) {
				return React.createElement(
					'option',
					{ value: nodeData },
					nodeData
				);
			});
			var option2 = this.state.secondData.map(function (nodeData) {
				return React.createElement(
					'option',
					{ value: nodeData },
					nodeData
				);
			});
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h2',
					{ style: { textAlign: 'center' } },
					'Company'
				),
				React.createElement(
					'div',
					{ style: { textAlign: 'center' } },
					React.createElement(
						'select',
						{ ref: 'firstSelect', onChange: this.syncData },
						option1
					)
				),
				React.createElement(
					'h2',
					{ style: { textAlign: 'center' } },
					'Product'
				),
				React.createElement(
					'div',
					{ style: { textAlign: 'center' } },
					React.createElement(
						'select',
						{ ref: 'secondSelect', onChange: this.sendMessage },
						option2
					)
				)
			);
		}
	});

	module.exports = SecondaryMenu;

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(159);
	var EventEmitter = __webpack_require__(163).EventEmitter;
	var assign = __webpack_require__(164);
	var TodoConstants = __webpack_require__(168);

	var data = {
	  first: ['Apple', 'HTC', 'Samsung'],
	  second: {
	    Apple: ['iPhone5C', 'iPhone5S', 'iPhone6', 'iPhone6Plus'],
	    HTC: ['Desire820', 'ButteryFlyS', 'One_M9', 'One_E9'],
	    Samsung: ['GalaxyS6', 'GalaxyS6Edge', 'GalaxyNote3', 'GalaxyNote4', 'GalaxyNoteEdge']
	  }
	};

	var getInput = function getInput(selected) {
	  if (!selected) {
	    return {
	      firstData: data.first,
	      secondData: data.second.Apple
	    };
	  } else {
	    return {
	      firstData: data.first,
	      secondData: data.second[selected]
	    };
	  }
	};

	var model = null;

	var SecondaryMenuStore = assign({}, EventEmitter.prototype, {
	  getAll: function getAll(selected) {
	    model = getInput(selected);
	    return model;
	  },
	  getCurrent: function getCurrent() {
	    return model;
	  },
	  changeSecondMenu: function changeSecondMenu(selected) {
	    this.getAll(selected);
	  },
	  emitChange: function emitChange() {
	    this.emit('menuChange');
	  },
	  addChangeListener: function addChangeListener(callback) {
	    this.on('menuChange', callback);
	  },
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener('menuChange', callback);
	  }
	});

	AppDispatcher.register(function (payload) {
	  switch (payload.eventName) {
	    case TodoConstants.SECONDMENU_TRIGGER:
	      SecondaryMenuStore.changeSecondMenu(payload.newItem.item);
	      //trigger view update after model is updated
	      SecondaryMenuStore.emitChange();
	      break;
	  }
	});

	module.exports = SecondaryMenuStore;

/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	'use strick';

	var AppDispatcher = __webpack_require__(159);
	var TodoConstants = __webpack_require__(168);

	var SecondaryMenuAction = {
	  changeSecondMenu: function changeSecondMenu(selected) {
	    AppDispatcher.dispatch({
	      eventName: TodoConstants.SECONDMENU_TRIGGER,
	      newItem: { item: selected }
	    });
	  },
	  sendMessage: function sendMessage(data) {
	    AppDispatcher.dispatch({
	      eventName: 'bannerAdd',
	      newItem: { item: data,
	        refDispatcher: AppDispatcher
	      }
	    });
	  }
	};

	module.exports = SecondaryMenuAction;

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(180);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(183)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./base.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./base.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(181)();
	// imports


	// module
	exports.push([module.id, "html,\r\nbody {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\nbutton {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tbackground: none;\r\n\tfont-size: 100%;\r\n\tvertical-align: baseline;\r\n\tfont-family: inherit;\r\n\tcolor: inherit;\r\n\t-webkit-appearance: none;\r\n\t-ms-appearance: none;\r\n\t-o-appearance: none;\r\n\tappearance: none;\r\n}\r\n\r\nbody {\r\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\r\n\tline-height: 1.4em;\r\n\tbackground: #eaeaea url(" + __webpack_require__(182) + ");\r\n\tcolor: #4d4d4d;\r\n\twidth: 550px;\r\n\tmargin: 0 auto;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-font-smoothing: antialiased;\r\n\t-ms-font-smoothing: antialiased;\r\n\t-o-font-smoothing: antialiased;\r\n\tfont-smoothing: antialiased;\r\n}\r\n\r\nbutton,\r\ninput[type=\"checkbox\"] {\r\n  outline: none;\r\n}\r\n\r\n#todoapp {\r\n\tbackground: #fff;\r\n\tbackground: rgba(255, 255, 255, 0.9);\r\n\tmargin: 130px 0 40px 0;\r\n\tborder: 1px solid #ccc;\r\n\tposition: relative;\r\n\tborder-top-left-radius: 2px;\r\n\tborder-top-right-radius: 2px;\r\n\tbox-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2),\r\n\t\t\t\t0 25px 50px 0 rgba(0, 0, 0, 0.15);\r\n}\r\n\r\n#todoapp:before {\r\n\tcontent: '';\r\n\tborder-left: 1px solid #f5d6d6;\r\n\tborder-right: 1px solid #f5d6d6;\r\n\twidth: 2px;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 40px;\r\n\theight: 100%;\r\n}\r\n\r\n#todoapp input::-webkit-input-placeholder {\r\n\tfont-style: italic;\r\n}\r\n\r\n#todoapp input::-moz-placeholder {\r\n\tfont-style: italic;\r\n\tcolor: #a9a9a9;\r\n}\r\n\r\n#todoapp h1 {\r\n\tposition: absolute;\r\n\ttop: -120px;\r\n\twidth: 100%;\r\n\tfont-size: 70px;\r\n\tfont-weight: bold;\r\n\ttext-align: center;\r\n\tcolor: #b3b3b3;\r\n\tcolor: rgba(255, 255, 255, 0.3);\r\n\ttext-shadow: -1px -1px rgba(0, 0, 0, 0.2);\r\n\t-webkit-text-rendering: optimizeLegibility;\r\n\t-moz-text-rendering: optimizeLegibility;\r\n\t-ms-text-rendering: optimizeLegibility;\r\n\t-o-text-rendering: optimizeLegibility;\r\n\ttext-rendering: optimizeLegibility;\r\n}\r\n\r\n#header {\r\n\tpadding-top: 15px;\r\n\tborder-radius: inherit;\r\n}\r\n\r\n#header:before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tleft: 0;\r\n\theight: 15px;\r\n\tz-index: 2;\r\n\tborder-bottom: 1px solid #6c615c;\r\n\tbackground: #8d7d77;\r\n\tbackground: -webkit-gradient(linear, left top, left bottom, from(rgba(132, 110, 100, 0.8)),to(rgba(101, 84, 76, 0.8)));\r\n\tbackground: -webkit-linear-gradient(top, rgba(132, 110, 100, 0.8), rgba(101, 84, 76, 0.8));\r\n\tbackground: linear-gradient(top, rgba(132, 110, 100, 0.8), rgba(101, 84, 76, 0.8));\r\n\tfilter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#9d8b83', EndColorStr='#847670');\r\n\tborder-top-left-radius: 1px;\r\n\tborder-top-right-radius: 1px;\r\n}\r\n\r\n#new-todo,\r\n.edit {\r\n\tposition: relative;\r\n\tmargin: 0;\r\n\twidth: 100%;\r\n\tfont-size: 24px;\r\n\tfont-family: inherit;\r\n\tline-height: 1.4em;\r\n\tborder: 0;\r\n\toutline: none;\r\n\tcolor: inherit;\r\n\tpadding: 6px;\r\n\tborder: 1px solid #999;\r\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\r\n\t-moz-box-sizing: border-box;\r\n\t-ms-box-sizing: border-box;\r\n\t-o-box-sizing: border-box;\r\n\tbox-sizing: border-box;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-font-smoothing: antialiased;\r\n\t-ms-font-smoothing: antialiased;\r\n\t-o-font-smoothing: antialiased;\r\n\tfont-smoothing: antialiased;\r\n}\r\n\r\n#new-todo {\r\n\tpadding: 16px 16px 16px 60px;\r\n\tborder: none;\r\n\tbackground: rgba(0, 0, 0, 0.02);\r\n\tz-index: 2;\r\n\tbox-shadow: none;\r\n}\r\n\r\n#main {\r\n\tposition: relative;\r\n\tz-index: 2;\r\n\tborder-top: 1px dotted #adadad;\r\n}\r\n\r\nlabel[for='toggle-all'] {\r\n\tdisplay: none;\r\n}\r\n\r\n#toggle-all {\r\n\tposition: absolute;\r\n\ttop: -42px;\r\n\tleft: -4px;\r\n\twidth: 40px;\r\n\ttext-align: center;\r\n\t/* Mobile Safari */\r\n\tborder: none;\r\n}\r\n\r\n#toggle-all:before {\r\n\tcontent: '\\BB';\r\n\tfont-size: 28px;\r\n\tcolor: #d9d9d9;\r\n\tpadding: 0 25px 7px;\r\n}\r\n\r\n#toggle-all:checked:before {\r\n\tcolor: #737373;\r\n}\r\n\r\n#todo-list {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tlist-style: none;\r\n}\r\n\r\n#todo-list li {\r\n\tposition: relative;\r\n\tfont-size: 24px;\r\n\tborder-bottom: 1px dotted #ccc;\r\n}\r\n\r\n#todo-list li:last-child {\r\n\tborder-bottom: none;\r\n}\r\n\r\n#todo-list li.editing {\r\n\tborder-bottom: none;\r\n\tpadding: 0;\r\n}\r\n\r\n#todo-list li.editing .edit {\r\n\tdisplay: block;\r\n\twidth: 506px;\r\n\tpadding: 13px 17px 12px 17px;\r\n\tmargin: 0 0 0 43px;\r\n}\r\n\r\n#todo-list li.editing .view {\r\n\tdisplay: none;\r\n}\r\n\r\n#todo-list li .toggle {\r\n\ttext-align: center;\r\n\twidth: 40px;\r\n\t/* auto, since non-WebKit browsers doesn't support input styling */\r\n\theight: auto;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tbottom: 0;\r\n\tmargin: auto 0;\r\n\t/* Mobile Safari */\r\n\tborder: none;\r\n\t-webkit-appearance: none;\r\n\t-ms-appearance: none;\r\n\t-o-appearance: none;\r\n\tappearance: none;\r\n}\r\n\r\n#todo-list li .toggle:after {\r\n\tcontent: '\\2714';\r\n\t/* 40 + a couple of pixels visual adjustment */\r\n\tline-height: 43px;\r\n\tfont-size: 20px;\r\n\tcolor: #d9d9d9;\r\n\ttext-shadow: 0 -1px 0 #bfbfbf;\r\n}\r\n\r\n#todo-list li .toggle:checked:after {\r\n\tcolor: #85ada7;\r\n\ttext-shadow: 0 1px 0 #669991;\r\n\tbottom: 1px;\r\n\tposition: relative;\r\n}\r\n\r\n#todo-list li label {\r\n\twhite-space: pre;\r\n\tword-break: break-word;\r\n\tpadding: 15px 60px 15px 15px;\r\n\tmargin-left: 45px;\r\n\tdisplay: block;\r\n\tline-height: 1.2;\r\n\t-webkit-transition: color 0.4s;\r\n\ttransition: color 0.4s;\r\n}\r\n\r\n#todo-list li.completed label {\r\n\tcolor: #a9a9a9;\r\n\ttext-decoration: line-through;\r\n}\r\n\r\n#todo-list li .destroy {\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 10px;\r\n\tbottom: 0;\r\n\twidth: 40px;\r\n\theight: 40px;\r\n\tmargin: auto 0;\r\n\tfont-size: 22px;\r\n\tcolor: #a88a8a;\r\n\t-webkit-transition: all 0.2s;\r\n\ttransition: all 0.2s;\r\n}\r\n\r\n#todo-list li .destroy:hover {\r\n\ttext-shadow: 0 0 1px #000,\r\n\t\t\t\t 0 0 10px rgba(199, 107, 107, 0.8);\r\n\t-webkit-transform: scale(1.3);\r\n\t-ms-transform: scale(1.3);\r\n\ttransform: scale(1.3);\r\n}\r\n\r\n#todo-list li .destroy:after {\r\n\tcontent: '\\2716';\r\n}\r\n\r\n#todo-list li:hover .destroy {\r\n\tdisplay: block;\r\n}\r\n\r\n#todo-list li .edit {\r\n\tdisplay: none;\r\n}\r\n\r\n#todo-list li.editing:last-child {\r\n\tmargin-bottom: -1px;\r\n}\r\n\r\n#footer {\r\n\tcolor: #777;\r\n\tpadding: 0 15px;\r\n\tposition: absolute;\r\n\tright: 0;\r\n\tbottom: -31px;\r\n\tleft: 0;\r\n\theight: 20px;\r\n\tz-index: 1;\r\n\ttext-align: center;\r\n}\r\n\r\n#footer:before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tright: 0;\r\n\tbottom: 31px;\r\n\tleft: 0;\r\n\theight: 50px;\r\n\tz-index: -1;\r\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.3),\r\n\t\t\t\t0 6px 0 -3px rgba(255, 255, 255, 0.8),\r\n\t\t\t\t0 7px 1px -3px rgba(0, 0, 0, 0.3),\r\n\t\t\t\t0 43px 0 -6px rgba(255, 255, 255, 0.8),\r\n\t\t\t\t0 44px 2px -6px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n#todo-count {\r\n\tfloat: left;\r\n\ttext-align: left;\r\n}\r\n\r\n#filters {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tlist-style: none;\r\n\tposition: absolute;\r\n\tright: 0;\r\n\tleft: 0;\r\n}\r\n\r\n#filters li {\r\n\tdisplay: inline;\r\n}\r\n\r\n#filters li a {\r\n\tcolor: #83756f;\r\n\tmargin: 2px;\r\n\ttext-decoration: none;\r\n}\r\n\r\n#filters li a.selected {\r\n\tfont-weight: bold;\r\n}\r\n\r\n#clear-completed {\r\n\tfloat: right;\r\n\tposition: relative;\r\n\tline-height: 20px;\r\n\ttext-decoration: none;\r\n\tbackground: rgba(0, 0, 0, 0.1);\r\n\tfont-size: 11px;\r\n\tpadding: 0 10px;\r\n\tborder-radius: 3px;\r\n\tbox-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n#clear-completed:hover {\r\n\tbackground: rgba(0, 0, 0, 0.15);\r\n\tbox-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n#info {\r\n\tmargin: 65px auto 0;\r\n\tcolor: #a6a6a6;\r\n\tfont-size: 12px;\r\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);\r\n\ttext-align: center;\r\n}\r\n\r\n#info a {\r\n\tcolor: inherit;\r\n}\r\n\r\n/*\r\n\tHack to remove background from Mobile Safari.\r\n\tCan't use it globally since it destroys checkboxes in Firefox and Opera\r\n*/\r\n\r\n@media screen and (-webkit-min-device-pixel-ratio:0) {\r\n\t#toggle-all,\r\n\t#todo-list li .toggle {\r\n\t\tbackground: none;\r\n\t}\r\n\r\n\t#todo-list li .toggle {\r\n\t\theight: 40px;\r\n\t}\r\n\r\n\t#toggle-all {\r\n\t\ttop: -56px;\r\n\t\tleft: -15px;\r\n\t\twidth: 65px;\r\n\t\theight: 41px;\r\n\t\t-webkit-transform: rotate(90deg);\r\n\t\t-ms-transform: rotate(90deg);\r\n\t\ttransform: rotate(90deg);\r\n\t\t-webkit-appearance: none;\r\n\t\tappearance: none;\r\n\t}\r\n}\r\n\r\n.hidden {\r\n\tdisplay: none;\r\n}\r\n\r\nhr {\r\n\tmargin: 20px 0;\r\n\tborder: 0;\r\n\tborder-top: 1px dashed #C5C5C5;\r\n\tborder-bottom: 1px dashed #F7F7F7;\r\n}\r\n\r\n.learn a {\r\n\tfont-weight: normal;\r\n\ttext-decoration: none;\r\n\tcolor: #b83f45;\r\n}\r\n\r\n.learn a:hover {\r\n\ttext-decoration: underline;\r\n\tcolor: #787e7e;\r\n}\r\n\r\n.learn h3,\r\n.learn h4,\r\n.learn h5 {\r\n\tmargin: 10px 0;\r\n\tfont-weight: 500;\r\n\tline-height: 1.2;\r\n\tcolor: #000;\r\n}\r\n\r\n.learn h3 {\r\n\tfont-size: 24px;\r\n}\r\n\r\n.learn h4 {\r\n\tfont-size: 18px;\r\n}\r\n\r\n.learn h5 {\r\n\tmargin-bottom: 0;\r\n\tfont-size: 14px;\r\n}\r\n\r\n.learn ul {\r\n\tpadding: 0;\r\n\tmargin: 0 0 30px 25px;\r\n}\r\n\r\n.learn li {\r\n\tline-height: 20px;\r\n}\r\n\r\n.learn p {\r\n\tfont-size: 15px;\r\n\tfont-weight: 300;\r\n\tline-height: 1.3;\r\n\tmargin-top: 0;\r\n\tmargin-bottom: 0;\r\n}\r\n\r\n.quote {\r\n\tborder: none;\r\n\tmargin: 20px 0 60px 0;\r\n}\r\n\r\n.quote p {\r\n\tfont-style: italic;\r\n}\r\n\r\n.quote p:before {\r\n\tcontent: '\\201C';\r\n\tfont-size: 50px;\r\n\topacity: .15;\r\n\tposition: absolute;\r\n\ttop: -20px;\r\n\tleft: 3px;\r\n}\r\n\r\n.quote p:after {\r\n\tcontent: '\\201D';\r\n\tfont-size: 50px;\r\n\topacity: .15;\r\n\tposition: absolute;\r\n\tbottom: -42px;\r\n\tright: 3px;\r\n}\r\n\r\n.quote footer {\r\n\tposition: absolute;\r\n\tbottom: -40px;\r\n\tright: 0;\r\n}\r\n\r\n.quote footer img {\r\n\tborder-radius: 3px;\r\n}\r\n\r\n.quote footer a {\r\n\tmargin-left: 5px;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.speech-bubble {\r\n\tposition: relative;\r\n\tpadding: 10px;\r\n\tbackground: rgba(0, 0, 0, .04);\r\n\tborder-radius: 5px;\r\n}\r\n\r\n.speech-bubble:after {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\ttop: 100%;\r\n\tright: 30px;\r\n\tborder: 13px solid transparent;\r\n\tborder-top-color: rgba(0, 0, 0, .04);\r\n}\r\n\r\n.learn-bar > .learn {\r\n\tposition: absolute;\r\n\twidth: 272px;\r\n\ttop: 8px;\r\n\tleft: -300px;\r\n\tpadding: 10px;\r\n\tborder-radius: 5px;\r\n\tbackground-color: rgba(255, 255, 255, .6);\r\n\t-webkit-transition-property: left;\r\n\ttransition-property: left;\r\n\t-webkit-transition-duration: 500ms;\r\n\ttransition-duration: 500ms;\r\n}\r\n\r\n@media (min-width: 899px) {\r\n\t.learn-bar {\r\n\t\twidth: auto;\r\n\t\tmargin: 0 0 0 300px;\r\n\t}\r\n\r\n\t.learn-bar > .learn {\r\n\t\tleft: 8px;\r\n\t}\r\n\r\n\t.learn-bar #todoapp {\r\n\t\twidth: 550px;\r\n\t\tmargin: 130px auto 40px auto;\r\n\t}\r\n}\r\n", ""]);

	// exports


/***/ },

/***/ 181:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";

	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },

/***/ 182:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(185);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(183)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(181)();
	// imports


	// module
	exports.push([module.id, "/*\r\n * Copyright (c) 2014-2015, Facebook, Inc.\r\n * All rights reserved.\r\n *\r\n * This source code is licensed under the BSD-style license found in the\r\n * LICENSE file in the root directory of this source tree. An additional grant\r\n * of patent rights can be found in the PATENTS file in the same directory.\r\n *\r\n * base.css overrides\r\n */\r\n\r\n/**\r\n * We are not changing from display:none, but rather re-rendering instead.\r\n * Therefore this needs to be displayed normally by default.\r\n */\r\n#todo-list li .edit {\r\n  display: inline;\r\n}\r\n", ""]);

	// exports


/***/ }

});