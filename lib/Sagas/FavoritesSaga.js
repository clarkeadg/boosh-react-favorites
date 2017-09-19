'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _FavoriteSchema = require('../Schemas/FavoriteSchema');

var _FavoriteSchema2 = _interopRequireDefault(_FavoriteSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  var _marked = [attemptGetFavorites, attemptAddFavorite, attemptRemoveFavorite, watchGetFavoritesAttempt, watchAddFavoriteAttempt, watchRemoveFavoriteAttempt].map(_regenerator2.default.mark);

  function attemptGetFavorites(meta) {
    var query, path, response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetFavorites$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/favorites/";

            // make the call to the api

            _context.next = 4;
            return (0, _effects.call)(api.getFavorites, query);

          case 4:
            response = _context.sent;


            console.log('GOT FAVORITES', response.data, meta);

            // success?

            if (!(response && response.ok)) {
              _context.next = 18;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_FavoriteSchema2.default));

            if (!payload.result.length) {
              payload.entities.favorites = {};
            }

            payload.query = query;
            payload.path = path;
            payload.count = count;

            //console.log('NORMALIZED DATA', payload)

            _context.next = 16;
            return (0, _effects.put)(_Creators2.default.getFavoritesSuccess(payload));

          case 16:
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return (0, _effects.put)(_Creators2.default.getFavoritesFailure(response.data));

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function attemptAddFavorite(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptAddFavorite$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.call)(api.addFavorite, meta);

          case 2:
            response = _context2.sent;

            if (!(response && response.ok)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 6;
            return (0, _effects.put)(_Creators2.default.getFavoritesAttempt({
              query: {
                item_type: meta.item_type,
                item_id: meta.item_id
              }
            }));

          case 6:
            _context2.next = 10;
            break;

          case 8:
            _context2.next = 10;
            return (0, _effects.put)(_Creators2.default.addFavoriteFailure(response.data));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function attemptRemoveFavorite(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptRemoveFavorite$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.call)(api.removeFavorite, meta.id);

          case 2:
            response = _context3.sent;

            if (!(response && response.ok)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 6;
            return (0, _effects.put)(_Creators2.default.removeFavoriteSuccess(meta));

          case 6:
            _context3.next = 10;
            break;

          case 8:
            _context3.next = 10;
            return (0, _effects.put)(_Creators2.default.removeFavoriteFailure(response.data));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function watchGetFavoritesAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchGetFavoritesAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!true) {
              _context4.next = 9;
              break;
            }

            _context4.next = 3;
            return (0, _effects.take)(_Types2.default.GET_FAVORITES_REQUEST);

          case 3:
            _ref = _context4.sent;
            meta = _ref.meta;
            _context4.next = 7;
            return (0, _effects.call)(attemptGetFavorites, meta);

          case 7:
            _context4.next = 0;
            break;

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function watchAddFavoriteAttempt() {
    var _ref2, _meta;

    return _regenerator2.default.wrap(function watchAddFavoriteAttempt$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!true) {
              _context5.next = 9;
              break;
            }

            _context5.next = 3;
            return (0, _effects.take)(_Types2.default.ADD_FAVORITE_REQUEST);

          case 3:
            _ref2 = _context5.sent;
            _meta = _ref2.meta;
            _context5.next = 7;
            return (0, _effects.call)(attemptAddFavorite, _meta);

          case 7:
            _context5.next = 0;
            break;

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this);
  }

  function watchRemoveFavoriteAttempt() {
    var _ref3, _meta2;

    return _regenerator2.default.wrap(function watchRemoveFavoriteAttempt$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!true) {
              _context6.next = 9;
              break;
            }

            _context6.next = 3;
            return (0, _effects.take)(_Types2.default.REMOVE_FAVORITE_REQUEST);

          case 3:
            _ref3 = _context6.sent;
            _meta2 = _ref3.meta;
            _context6.next = 7;
            return (0, _effects.call)(attemptRemoveFavorite, _meta2);

          case 7:
            _context6.next = 0;
            break;

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  return {
    watchGetFavoritesAttempt: watchGetFavoritesAttempt,
    watchAddFavoriteAttempt: watchAddFavoriteAttempt,
    watchRemoveFavoriteAttempt: watchRemoveFavoriteAttempt,
    attemptGetFavorites: attemptGetFavorites,
    attemptAddFavorite: attemptAddFavorite,
    attemptRemoveFavorite: attemptRemoveFavorite
  };
};

/* SCHEMAS */