import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from './userStore'
import friendStore from './friendStore'
// import CurrentUserStore from '../../stores/current_userStore'
import MessagesAction from '../actions/messages'
import {ActionTypes} from '../constants/app'

let openChatId = parseInt(Object.keys(friendStore.getFriends())[0], 10)
// parseInt() = parses (analyse specifically) a string and returns an integer.

class MsgsStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  getOpenChatUserId() {
    const friends = friendStore.getFriends()
    if (Number.isNaN(openChatId) && friends.length !== 0) {
      openChatId = friends[0].id
      MessagesAction.getMsgs(openChatId)
    } // もし9行目 openChatIdに値が入ってない場合かつ友達が存在する場合、ociに銭湯に位置する友達（arrayの中で）を設定し云々
    return openChatId // ９行目の値を返す
  }

  getMsgs() {
    if (!this.get('MsgsJson')) this.setMsgs([])
    return this.get('MsgsJson')
  }

  setMsgs(array) {
    this.set('MsgsJson', array)
  }

  pushMsgs(obj) {
    this.getMsgs().push(obj)
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
      Msgs.pushMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      Msgs.pushMsgs(action.json)
      Msgs.emitChange()
      break
  }

  return true
})

export default Msgs
