import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class friendStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getFriends() {
    if (!this.get('usersJson')) this.setFriends([])
    return this.get('usersJson')
  }
  
  setFriends(array) {
    this.setFriends('usersJson', array)
  }
}

const Friend = new friendStore()

Friend.dispatcherToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_FRIENDS:
      Friend.setFriends(action.json)
      Friend.emitChange()
      break
  }
  return true
})

window.Friend = Friend
export default Friend
