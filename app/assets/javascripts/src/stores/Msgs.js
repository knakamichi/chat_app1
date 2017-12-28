import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import friendStore from './friendStore'
import MessagesAction from '../actions/messages'
import {ActionTypes} from '../constants/app'

var openChatId = parseInt(Object.keys(friendStore.getFriends())[0], 10)

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
    }
    return openChatId
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

Msgs.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MSGS:
      Msgs.setMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.GET_ALL_MSGS:
      Msgs.setMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.POST_MSGS:
      Msgs.pushMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      Msgs.pushMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.CHANGE_OPEN_CHAT:
      Msgs.setMsgs(
        openChatId = payload.action.openChatId,
      )
      Msgs.emitChange()
      break
  }

  return true
})

export default Msgs
