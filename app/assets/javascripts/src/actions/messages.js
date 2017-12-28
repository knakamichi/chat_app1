import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  getMsgs(friendsId) {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.MESSAGES}`)
        .query({id: friendsId})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_MSGS,
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

  postMsgs(content, receiver_id) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGES}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({receiver_id, content})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
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
    Dispatcher.handleViewAction({
      type: ActionTypes.CHANGE_OPEN_CHAT,
      openChatId: friendsId,
    })
  },

  updateLastAccess(currentUserId, last_access) {
    return new Promise((resolve, reject) => {
      // debugger
      request
        .put(`${APIEndpoints.USERS}/${currentUserId}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({currentUserId, last_seen: last_access})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            resolve(json)
            console.log(json)
          } else {
            reject(res)
          }
        })
    })
  },

  deleteMsgs(currentUserId, friendId) {
    return new Promise((resolve, reject) => {
      request
        .delete(`${APIEndpoints.MESSAGES}/${currentUserId}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({id: friendId})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_MSGS,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
}
