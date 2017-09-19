import { Schema, valuesOf, arrayOf } from 'normalizr'

const FavoriteSchema = new Schema('favorites', { idAttribute: 'id' });

const UserSchema = new Schema('users', { idAttribute: 'id' });

FavoriteSchema.define({
  user: UserSchema
});

export default FavoriteSchema;
