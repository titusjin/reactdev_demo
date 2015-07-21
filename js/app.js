/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var TodoApp = require('./components/TodoApp.react');
var SecondaryMenu = require('./components/SecondaryMenu.react');
var Banner = require('./components/Banner.react');

// This is where we have to put our css file after using style-loader!css-loader with webpack
require('../todomvc-common/base.css');
require('../css/app.css');


React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);

React.render(
  <SecondaryMenu />,
  document.getElementById('example')
);

React.render(
  <Banner />,
  document.getElementById('banner')
);
