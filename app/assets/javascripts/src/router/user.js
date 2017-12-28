import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Search from '../components/userSearchbox'
// import UserAction from '../actions/users'

export default class UserSearchRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateUserSearch)
  }

  decorateUserSearch(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Search)
    next()
  }
}
