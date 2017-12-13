import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from './userStore'
import MessagesAction from '../actions/messages'
import {ActionTypes} from '../constants/app'

let userId = parseInt(Object.keys(UserStore.getUsers())[0], 10)

class MsgsStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getUserId() {
    const users = UserStore.getUsers()
    if (Number.isNaN(userId) && users.length !== 0) {
      userId = users[0].id
      MessagesAction.getMsgs()
    }
    return userId
  }

  getMsgs() {
    if (!this.get('MsgsJson')) this.setMsgs([])
    return this.get('MsgsJson')
  }

  setMsgs(array) {
    this.set('MsgsJson', array)
  }
}

const Msgs = new MsgsStore()

Msgs.dispatchToken = Dispatcher.register(payload => { // Dispatcher から payloadの形でアクションデータをもらう
  const action = payload.action // action に payload中のaction, つまり getMsgs か postMsgsを読む。

  switch (action.type) { // action.type = payload の中の action の種類。(line 40)
    case ActionTypes.GET_MSGS:
      Msgs.setMsgs(action.json) // ストアのデータを変えてるから set, Msgsにjsonをset. ここのjson はdb 内の全部のデータ
      Msgs.emitChange()
      break

    case ActionTypes.POST_MSGS:
      // すでにあるデータに書き加えるメソッド
      Msgs.push(action.json)
      Msgs.emitChange()
      break
  }

  return true
})

export default Msgs
