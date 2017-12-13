import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from './userStore'
// import UserAction from '../actions/users'
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
    return this.get('friends') // friends という key に入ってるものを取って来る（from store)
  }

  setFriends(array) {
    this.set('friends', array) // friends というkey に値を set array という引数を渡してる。
  }
}

const Friend = new FriendStore()

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

// window.Friend = Friend
export default Friend
