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

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _reactRouter = require('react-router');

var _booshReactUsers = require('boosh-react-users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { VideoThumb } from 'boosh-react-music';


/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */


/* Selectors */
var pageId = 1;

/* Selectors */


/* Actions */

/* React */

var FavoritesCollection = function (_React$Component) {
  (0, _inherits3.default)(FavoritesCollection, _React$Component);

  function FavoritesCollection() {
    (0, _classCallCheck3.default)(this, FavoritesCollection);
    return (0, _possibleConstructorReturn3.default)(this, (FavoritesCollection.__proto__ || (0, _getPrototypeOf2.default)(FavoritesCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(FavoritesCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var _props = this.props,
          user_id = _props.user_id,
          item_type = _props.item_type,
          item_id = _props.item_id;

      var Meta = {
        query: {
          page: pageNumber,
          per_page: 8
        },
        path: this.props.path || "/favorites/"
      };
      if (user_id) Meta.query.user_id = user_id;
      if (item_type) Meta.query.item_type = item_type;
      if (item_id) Meta.query.item_id = item_id;

      this.props.dispatch(_Creators2.default.getFavoritesAttempt(Meta));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getData(this.props.pageNumber);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        this.getData(newProps.pageNumber);
      }
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      //this.getData(pageId++)
    }
  }, {
    key: 'renderFavorite',
    value: function renderFavorite(item, meta) {
      var user_id = this.props.user_id;


      switch (item.item_type) {
        /*case 'video':
          return (
            <VideoThumb video={item}/>
          )
        break;*/
        case 'profile':
          if (user_id) {
            return _react2.default.createElement(_booshReactUsers.GetUser, { user_id: item.item_id, meta: meta });
          }
          return _react2.default.createElement(_booshReactUsers.GetUser, { user_id: item.user_id, meta: meta });
          break;
        default:
          return false;
          break;
      }
    }
  }, {
    key: 'renderFavorites',
    value: function renderFavorites(loading, favorites) {
      var _this2 = this;

      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }

      var user_id = this.props.user_id;


      if (this.props.viewType && this.props.viewType == 'list') {
        return _react2.default.createElement(
          _reactFoundation.Row,
          { upOnSmall: 1 },
          favorites.map(function (item, id) {
            return _react2.default.createElement(
              _reactFoundation.Column,
              { key: id },
              _this2.renderFavorite(item, true)
            );
          })
        );
      }

      var size = this.props.size || 4;

      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 2, upOnMedium: 4, upOnLarge: size },
        favorites.map(function (item, id) {
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _this2.renderFavorite(item, false)
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          favorites = _props2.favorites,
          pageNumber = _props2.pageNumber,
          loading = _props2.loading,
          user_id = _props2.user_id;

      //console.log('FAVORITES PAGE NUMBER', pageNumber)

      var path = this.props.path || "/favorites/";
      var per_page = this.props.per_page || 10;
      var pager = this.props.pager || "numbers";

      return _react2.default.createElement(
        'div',
        { className: 'Favorites' },
        this.renderFavorites(loading, favorites.items),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pager: pager, per_page: per_page, pageNumber: pageNumber, count: favorites.count })
      );
    }
  }]);
  return FavoritesCollection;
}(_react2.default.Component);

FavoritesCollection.propTypes = {
  me: _react2.default.PropTypes.object,
  loading: _react2.default.PropTypes.bool,
  favorites: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

FavoritesCollection.defaultProps = {
  me: {},
  viewType: 'grid',
  loading: true,
  favorites: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    loading: state.favorites.attempting,
    favorites: (0, _FavoritesSelector.getFavoritesCollection)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FavoritesCollection);