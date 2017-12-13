import {Dispatcher} from 'flux'
import assign from 'object-assign'

const appDispatcher = assign(new Dispatcher(), {
  handleServerAction(action) { // (actions)にはactions/messages.js 37-40の引数が入る
    this.dispatch({
      source: 'server',
      action: action,
    })
  },

  handleViewAction(action) {
    this.dispatch({
      source: 'view',
      action: action,
    })
  },
})

export default appDispatcher
