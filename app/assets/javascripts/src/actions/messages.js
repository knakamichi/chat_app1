import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
// getの場合
  getMsgs() {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.MESSAGES}`) // 取得したいjsonがあるURLを指定する
        .end((error, res) => {
          if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({ // calls the dispatcher to send data to store
              type: ActionTypes.GET_MSGS,
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
  postMsgs(messageContent) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGES}`) // たまたまpostのrouting がget と同じ。（rake routes 参照）
        .set('X-CSRF-Token', CSRFToken()) // CSRF防止対策
        .send({contents: messageContent}) // これによりサーバ側に送りたいデータを送ることが出来ます。（postMsgs()後の引数と一致させて動的化）
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({ // dispatcherに {}引数のアクションを知らせる
              type: ActionTypes.POST_MSGS,
              json,
            })
          } else {
            reject(res)
          }
        })
    })
  },
}
