// stores/Msgs.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'
import MessagesAction from '../actions/messages'

class MsgsStore extends BaseStore {
  addChangeListener(callback) {
  this.on('change', callback)
  }
  removeChangeListener(callback) {
  this.off('change', callback)
  }
// debugger
  getMsgs() {
   if (!this.get('MsgsJson')) this.setMsgs([])
   return this.get('MsgsJson')
  }

  setMsgs(array) {
    this.set('MsgsJson', array)
  }

  // postMsgs(messagesContent) {
  //   this.postMsgs('MsgsJson', messagesContent)
  // }
}
const Msgs = new MsgsStore()

Msgs.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MSGS:
      Msgs.getMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.POST_MSGS:
      Msgs.emitChange()
      break
  }

  return true
})

export default Msgs
