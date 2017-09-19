'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _List = require('./Containers/List');

var _List2 = _interopRequireDefault(_List);

var _Detail = require('./Containers/Detail');

var _Detail2 = _interopRequireDefault(_Detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/plugin' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _List2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: ':title', component: _Detail2.default })
  );
  return routes;
};