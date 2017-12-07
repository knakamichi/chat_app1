import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getUsers() {
    if (!this.get('usersJson')) this.setUsers([])
    return this.get('usersJson')
  }
  setUsers(array) {
    this.set('usersJson', array)
  }
//   getSearchUsers(){
//     if(!this.get('usersJson')) this.setSearchUsers([])
//     return this.get('usersJson')
//   }
//   setSearchUsers(array){
//     this.set('usersJson', array)
//   }
}

const User = new UserStore()

User.dispatcherToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_USERS:
      User.setUsers(action.json)
      User.emitChange()
      break

    case ActionTypes.SEARCH_USERS:
      User.setUsers(action.json)
      User.emitChange()
      break

    // case ActionTypes.FOLLOW_USERS:
    //   User.setUsers(action.json)
    //   User.emitChange()
    //   break

  }

  return true
})
window.User = User
export default User
