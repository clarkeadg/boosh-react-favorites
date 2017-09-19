'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _FavoritesSelector = require('../Selectors/FavoritesSelector');

var _booshReactAuth = require('boosh-react-auth');

var _booshReactComponents = require('boosh-react-components');

var _booshReactMusic = require('boosh-react-music');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Selectors */


/* Actions */

/* React */
var pageId = 1;

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */


/* Selectors */

var FavoritesCollection = function (_React$Component) {
  (0, _inherits3.default)(FavoritesCollection, _React$Component);

  function FavoritesCollection() {
    (0, _classCallCheck3.default)(this, FavoritesCollection);
    return (0, _possibleConstructorReturn3.default)(this, (FavoritesCollection.__proto__ || (0, _getPrototypeOf2.default)(FavoritesCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(FavoritesCollection, [{
    key: 'getData',
    value: function getData(pageNumber, user_id) {
      var Meta = {
        user_id: user_id,
        skip: (pageNumber - 1) * 2
      };
      this.props.dispatch(_Creators2.default.getFavoritesAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          pageNumber = _props.pageNumber,
          user_id = _props.user_id;

      if (pageNumber, user_id) {
        this.getData(pageNumber, user_id);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber || newProps.user_id !== this.props.user_id) {
        this.getData(newProps.pageNumber, newProps.user_id);
      }
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      this.getData(pageId++);
    }
  }, {
    key: 'render',
    value: function render() {
      var favorites = this.props.favorites;


      return _react2.default.createElement(_booshReactComponents.Portlet, { title: 'Music Videos', items: _react2.default.createElement(
          'div',
          null,
          favorites.map(function (item, id) {
            //console.log('2222', item)
            switch (item.group_key) {
              case 'video':
                return _react2.default.createElement(
                  'div',
                  { key: id },
                  _react2.default.createElement(_booshReactMusic.VideoThumb, { video: item })
                );
                break;
              default:
                return false;
                break;
            }
          })
        ) });
    }
  }]);
  return FavoritesCollection;
}(_react2.default.Component);

FavoritesCollection.propTypes = {
  me: _react2.default.PropTypes.object,
  favorites: _react2.default.PropTypes.array,
  pageNumber: _react2.default.PropTypes.number
};

FavoritesCollection.defaultProps = {
  me: {},
  favorites: [],
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    favorites: (0, _FavoritesSelector.getVisibleFavorites)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FavoritesCollection);