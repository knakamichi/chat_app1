// stores/Msgs.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class MsgsStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
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
  const action = payload.action       // action に payload中のaction, つまり getMsgs か postMsgsを読む。

  switch (action.type) {      // action.type = payload の中の action の種類。(line 40)
    case ActionTypes.GET_MSGS:
      Msgs.setMsgs(action.json)   // ストアのデータを変えてるから set ここのjson はdb 内の全部のデータ
      Msgs.emitChange()
      break

    case ActionTypes.POST_MSGS:
      // すでにあるデータに書き加えるメソッド
      // Msgs.setMsgs(action.json) // ストアにdispacherから送られた、つまり action から送ったjson をsetする
      Msgs.push(action.json)
      Msgs.emitChange()
      break
  }

  return true
})

export default Msgs
