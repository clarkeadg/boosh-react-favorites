'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var FavoriteSchema = new _normalizr.Schema('favorites', { idAttribute: 'id' });

var UserSchema = new _normalizr.Schema('users', { idAttribute: 'id' });

FavoriteSchema.define({
  user: UserSchema
});

exports.default = FavoriteSchema;