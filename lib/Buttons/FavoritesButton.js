'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _booshReactAuth = require('boosh-react-auth');

var _FavoritesSelector = require('../Selectors/FavoritesSelector');

var _reactFoundation = require('react-foundation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Link } from 'react-router'

/* Actions */

/* React */
var FavoritesButton = function (_React$Component) {
  (0, _inherits3.default)(FavoritesButton, _React$Component);

  function FavoritesButton() {
    (0, _classCallCheck3.default)(this, FavoritesButton);
    return (0, _possibleConstructorReturn3.default)(this, (FavoritesButton.__proto__ || (0, _getPrototypeOf2.default)(FavoritesButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(FavoritesButton, [{
    key: 'getData',
    value: function getData(item_type, item_id) {
      var _query;

      //console.log('FAVORITES BUTTON GET DATA', item_type, item_id)
      this.props.dispatch(_Creators2.default.getFavoritesAttempt({
        query: (_query = {
          user_id: this.props.me.id,
          item_type: item_type }, (0, _defineProperty3.default)(_query, 'item_type', item_type), (0, _defineProperty3.default)(_query, 'item_id', item_id), _query)
      }));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          me = _props.me,
          item_type = _props.item_type,
          item_id = _props.item_id;

      if (me.id && item_type && item_id) {
        this.getData(item_type, item_id);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.me.id !== this.props.me.id || newProps.item_type !== this.props.item_type || newProps.item_id !== this.props.item_id) {
        this.getData(newProps.item_type, newProps.item_id);
      }
    }
  }, {
    key: 'addFavorite',
    value: function addFavorite(item_type, item_id, user_id) {
      //console.log('ADD FAVORITE', this.props)

      this.props.dispatch(_Creators2.default.addFavoriteAttempt({
        item_type: item_type,
        item_id: item_id,
        user_id: user_id
      }));
    }
  }, {
    key: 'removeFavorite',
    value: function removeFavorite(id, item_type, item_id) {
      //console.log('REMOVE FAVORITE', id, item_type, item_id)

      this.props.dispatch(_Creators2.default.removeFavoriteAttempt({
        id: id,
        item_type: item_type,
        item_id: item_id
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('RENDER FAVORITE BUTTON', this.props);

      var _props2 = this.props,
          me = _props2.me,
          favorite = _props2.favorite,
          item_type = _props2.item_type,
          item_id = _props2.item_id;


      if (!me || !item_type || !item_id) {
        return false;
      }

      if (favorite && favorite.length) favorite = favorite[0];

      if (favorite && favorite.id) {
        return _react2.default.createElement(
          _reactFoundation.Button,
          { className: 'btn-favorite', onClick: function onClick() {
              _this2.removeFavorite(favorite.id, item_type, item_id);
            } },
          _react2.default.createElement(_reactFoundation.Icon, { name: 'fi-heart' }),
          'Remove Favorite'
        );
      }

      return _react2.default.createElement(
        _reactFoundation.Button,
        { className: 'btn-favorite', onClick: function onClick() {
            _this2.addFavorite(item_type, item_id, me.id);
          } },
        _react2.default.createElement(_reactFoundation.Icon, { name: 'fi-heart' }),
        'Add Favorite'
      );
    }
  }]);
  return FavoritesButton;
}(_react2.default.Component);

/* Components */


/* Selectors */


var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    favorite: (0, _FavoritesSelector.getFavorite)(state, props)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FavoritesButton);