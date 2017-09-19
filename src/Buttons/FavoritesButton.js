
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getMe } from 'boosh-react-auth'
import { getFavorite } from '../Selectors/FavoritesSelector'

/* Components */
import { Button, Icon  } from 'react-foundation';
//import { Link } from 'react-router'

class FavoritesButton extends React.Component {

  getData(item_type, item_id) {
    //console.log('FAVORITES BUTTON GET DATA', item_type, item_id)
    this.props.dispatch(Actions.getFavoritesAttempt({ 
      query: {
        user_id: this.props.me.id,
        item_type, item_type,
        item_id: item_id
      }
    }))
  }

  componentDidMount() {
    let { me, item_type, item_id } = this.props;
    if (me.id && item_type && item_id) {
      this.getData(item_type, item_id);
    }
  }

  componentWillReceiveProps (newProps) {
    if ( newProps.me.id   !== this.props.me.id 
      || newProps.item_type !== this.props.item_type
      || newProps.item_id   !== this.props.item_id ) 
    {
      this.getData(newProps.item_type, newProps.item_id)
    }
  }

  addFavorite(item_type, item_id, user_id) {
    //console.log('ADD FAVORITE', this.props)

    this.props.dispatch(Actions.addFavoriteAttempt({
      item_type: item_type,
      item_id: item_id,
      user_id: user_id
    }))
  }

  removeFavorite(id, item_type, item_id) {
    //console.log('REMOVE FAVORITE', id, item_type, item_id)

    this.props.dispatch(Actions.removeFavoriteAttempt({
      id: id,
      item_type: item_type,
      item_id: item_id
    }));
  }

  render() {

    console.log('RENDER FAVORITE BUTTON', this.props)

    let { me, favorite, item_type, item_id } = this.props;

    if (!me || !item_type || !item_id) {
      return false;
    }

    if(favorite && favorite.length) favorite = favorite[0];

    if (favorite && favorite.id) {
      return (
        <Button className="btn-favorite" onClick={()=>{this.removeFavorite(favorite.id, item_type, item_id)}}><Icon name="fi-heart"/>Remove Favorite</Button>
      )
    }

    return (
      <Button className="btn-favorite" onClick={()=>{this.addFavorite(item_type, item_id, me.id)}}><Icon name="fi-heart"/>Add Favorite</Button>
    )
  }

}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    favorite: getFavorite(state, props)
  }
}

export default connect(mapStateToProps)(FavoritesButton)

