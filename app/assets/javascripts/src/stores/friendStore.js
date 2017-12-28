import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class FriendStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getFriends() {
    if (!this.get('friends')) this.setFriends([])
    return this.get('friends')
  }

  setFriends(array) {
    this.set('friends', array)
  }
}

const friendStore = new FriendStore()

friendStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_FRIENDS:
      friendStore.setFriends(action.json)
      friendStore.emitChange()
      break
  }

  return true
})

export default friendStore
