import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'
import UserSearchRouter from './router/user'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()

  const userSearchRouter = new UserSearchRouter()
  userSearchRouter.register()

  page({click: false})
})
