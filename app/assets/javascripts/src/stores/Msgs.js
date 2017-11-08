// stores/Msgs.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import ActionTypes from '../constants/app'

class MsgsStore extends BaseStore {

 getMsgs() {
   if (!this.get('MsgsJson')) this.setMsgs([])
   return this.get('MsgsJson')
 }

  setMsgs(array) {
    this.set('MsgsJson', array)
  }

  postMsgs(MsgsID){
    this.postMsgs('MsgsJson')
  }

const Msgs = new MsgsStore()

Msgs.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MSGS:
      Msgs.setMsgs(action.json)
      Msgs.emitChange()
      break

    case ActionTypes.POST_Msgs:
        Msgs.emitChange()
        })
}

  return true
})

export default Msgs
