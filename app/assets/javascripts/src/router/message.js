import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessageAction from '../actions/messages'
import UserAction from '../actions/users'
import CurrentUserAction from '../actions/current_user'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App) // react-main に App を decorateしろ〜
    MessageAction.getMsgs() // ここでルーティングしてsql dbからデータをとるアクションを行う。
    UserAction.getFriends()
    CurrentUserAction.getCurrentUser()
    next()
  }
}
