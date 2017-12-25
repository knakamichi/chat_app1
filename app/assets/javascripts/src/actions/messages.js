import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
// getの場合
  getMsgs(friendsId) {
    return new Promise((resolve, reject) => {
      // debugger
      request
        .get(`${APIEndpoints.MESSAGES}`)
        .query({id: friendsId}) // 取得したいjsonがあるURLを指定する
        .end((error, res) => {
          if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({ // calls the dispatcher to send data to store
              type: ActionTypes.GET_MSGS,
              openChatId: friendsId,
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
  postMsgs(content, receiver_id) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGES}`) // たまたまpostのrouting がget と同じ。（rake routes 参照）
        .set('X-CSRF-Token', CSRFToken()) // CSRF防止対策
        .send({receiver_id, content}) // これによりサーバ側に送りたいデータを送ることが出来ます。（postMsgs()後の引数と一致させて動的化）
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({ // dispatcherに {}引数のアクションを知らせる
              type: ActionTypes.POST_MSGS,
              content,
              receiver_id,
              json,
            })
          } else {
            reject(res)
          }
        })
    })
  },

  saveImageChat(file, receiver_id) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGES}`)
        .set('X-CSRF-Token', CSRFToken())
        .attach('image', file, file.name)
        .field('receiver_id', receiver_id)
        .end((error, res) => {
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.SAVE_IMAGE_CHAT,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },

  changeOpenChat(friendsId) {
    return new Promise((resolve, reject) => {
      // debugger
      request
        .get(`${APIEndpoints.MESSAGES}`)
        .query({id: friendsId}) // 取得したいjsonがあるURLを指定する
        .end((error, res) => {
          if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({ // calls the dispatcher to send data to store
              type: ActionTypes.CHANGE_OPEN_CHAT,
              openChatId: friendsId,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },

  // createLastAccess(to_user_id, last_access) {
  //   return new Promise((resolve, reject) => {
  //     request
  //       .post(`${APIEndpoints.USERS}/${to_user_id}`)
  //       .set('X-CSRF-Token', CSRFToken())
  //       .send({id: to_user_id, last_access})
  //       .end((error, res) => {
  //         if (!error && res.status === 200) {
  //           const json = JSON.parse(res.text)
  //           resolve(json)
  //         } else {
  //           reject(res)
  //         }
  //       })
  //   })
  // },
  //
  // updateLastAccess(to_user_id, last_access) {
  //   return new Promise((resolve, reject) => {
  //     request
  //       .put(`${APIEndpoints.CURRENT_USER}`)
  //       .set('X-CSRF-Token', CSRFToken())
  //       .send({to_user_id, last_access})
  //       .end((error, res) => {
  //         if (!error && res.status === 200) {
  //           const json = JSON.parse(res.text)
  //           resolve(json)
  //         } else {
  //           reject(res)
  //         }
  //       })
  //   })
  // },

}
