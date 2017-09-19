
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getVisibleFavorites } from '../Selectors/FavoritesSelector'

/* Selectors */
import { getMe } from 'boosh-react-auth'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */
import { Portlet } from 'boosh-react-components'
import { VideoThumb } from 'boosh-react-music';
import { Link } from 'react-router'

let pageId = 1;

class FavoritesCollection extends React.Component {

  getData(pageNumber, user_id) {
    let Meta = {
      user_id: user_id,
      skip: (pageNumber-1) * 2
    }
    this.props.dispatch(Actions.getFavoritesAttempt(Meta));
  }

  componentDidMount() {
    let { pageNumber, user_id } = this.props;
    if ( pageNumber, user_id ) {
      this.getData(pageNumber, user_id)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber || newProps.user_id !== this.props.user_id) {
      this.getData(newProps.pageNumber, newProps.user_id)
    }
  }

  loadMore() {
    this.getData(pageId++)
  }

  render() {

    let { favorites } = this.props;

    return (
      <Portlet title={'Music Videos'} items={
        <div>{
          favorites.map((item, id) => {
            //console.log('2222', item)
            switch(item.group_key) {
              case 'video':
                return (
                  <div key={id}>
                    <VideoThumb video={item}/>
                  </div>
                )
              break;
              default:
                return false;
              break;
            }
          })
        }</div>
      } />
    )
  }

}

FavoritesCollection.propTypes = {
  me: React.PropTypes.object,
  favorites: React.PropTypes.array,
  pageNumber: React.PropTypes.number
}

FavoritesCollection.defaultProps = {
  me: {},
  favorites: [],
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    favorites: getVisibleFavorites(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(FavoritesCollection)

