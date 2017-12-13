import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessageAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App) // react-main に App を decorateしろ〜
    MessageAction.getMsgs() // ここでルーティングしてsql dbからデータをとるアクションを行う。
    UsersAction.getFriends()
    next()
  }
}
