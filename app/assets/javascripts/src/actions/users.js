import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  getUsers() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}`)
      .end((err, res) => {
        if (!err && res.ok) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  searchUsers(searchString) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}`)
      .send({searchString})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEARCH_USERS,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  getFriends() {  // userId という情報をこのアクションの中に投入してくれ
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.users/followers}, ${APIEndpoints.users/followed}`)
      .set('X-CSRF-Token', CSRFToken())
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json,
          })
          console.log(json);
        } else {
        reject(res)
      }
    })
  })
},

  followUsers(userId) {  // userId という情報をこのアクションの中に投入してくれ
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.RELATIONSHIPS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({followed_id: userId})  // followed_id という名前でuserIdという名の情報を渡せ
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          console.log(json);
          // Dispatcher.handleServerAction({
          //   type: ActionTypes.FOLLOW_USERS,
          //   json,
          // })
        } else {
          reject(res)
        }
      })
    })
  },
}
