// actions/messages.js
import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
// getの場合
  getMsgs() {
    return new Promise((resolve, reject) => {
      request
      .get('/models/message.rb') // 取得したいjsonがあるURLを指定する
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_Msgs,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

// postの場合
  postMsgs(MsgsId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.Msgs}`) //
      .set('X-CSRF-Token', CSRFToken()) // CSRF防止対策
      .send({Msgs_id: MsgsId}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_Msgs,
            MsgsId,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
