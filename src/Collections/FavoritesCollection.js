
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getFavoritesCollection } from '../Selectors/FavoritesSelector'

/* Selectors */
import { getMe } from 'boosh-react-auth'

/* Sagas */
//import GetCommentsSaga from '../../Sagas/Preloaders/GetCommentsSaga'

/* Components */
import { Row, Column } from 'react-foundation';
import { Pagination, Portlet, Loading } from 'boosh-react-components'
//import { VideoThumb } from 'boosh-react-music';
import { Link } from 'react-router'
import { GetUser } from 'boosh-react-users'

let pageId = 1;

class FavoritesCollection extends React.Component {

  getData(pageNumber) {
    let { user_id, item_type, item_id } = this.props;
    let Meta = {
      query: {
        page: pageNumber,
        per_page: 8
      },
      path: this.props.path || "/favorites/"
    }
    if (user_id)   Meta.query.user_id = user_id;
    if (item_type) Meta.query.item_type = item_type;
    if (item_id)   Meta.query.item_id = item_id;

    this.props.dispatch(Actions.getFavoritesAttempt(Meta));
  }

  componentDidMount() {
    this.getData(this.props.pageNumber) 
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber) {
      this.getData(newProps.pageNumber)
    }
  }

  loadMore() {
    //this.getData(pageId++)
  }

  renderFavorite(item, meta) {
    let { user_id } = this.props;

    switch(item.item_type) {
      /*case 'video':
        return (
          <VideoThumb video={item}/>
        )
      break;*/
      case 'profile':
        if (user_id) {
          return (
            <GetUser user_id={item.item_id} meta={meta}/>
          )
        }
        return (
          <GetUser user_id={item.user_id} meta={meta}/>
        )
      break;
      default:
        return false;
      break;
    }
  }

  renderFavorites(loading, favorites) {
    if (loading) {
      return (
        <Loading/>
      )
    }

    let { user_id } = this.props;

    if(this.props.viewType && this.props.viewType == 'list') {
      return (
        <Row upOnSmall={1}>
          {favorites.map((item, id) => {
            return (
              <Column key={id}>
                { this.renderFavorite(item, true) }
              </Column>
            )
          })}
        </Row>
      )
    }

    let size = this.props.size || 4;

    return (
      <Row upOnSmall={2} upOnMedium={4} upOnLarge={size}>
        {favorites.map((item, id) => {
          return (
            <Column key={id}>
              { this.renderFavorite(item, false) }
            </Column>
          )
        })}
      </Row>
    )
  }

  render() {

    let { favorites, pageNumber, loading, user_id } = this.props;

    //console.log('FAVORITES PAGE NUMBER', pageNumber)

    let path = this.props.path || "/favorites/";
    let per_page = this.props.per_page || 10;
    let pager = this.props.pager || "numbers";

    return (
      <div className="Favorites">
        { this.renderFavorites(loading, favorites.items) }
        <Pagination path={path} pager={pager} per_page={per_page} pageNumber={pageNumber} count={favorites.count}/>
      </div>
    )
    
  }

}

FavoritesCollection.propTypes = {
  me: React.PropTypes.object,
  loading: React.PropTypes.bool,
  favorites: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

FavoritesCollection.defaultProps = {
  me: {},
  viewType: 'grid',
  loading: true,
  favorites: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    loading: state.favorites.attempting,
    favorites: getFavoritesCollection(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetCommentsSaga, {}]
  ];
}
Comments.preload = preload;*/

export default connect(mapStateToProps)(FavoritesCollection)

