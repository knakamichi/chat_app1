import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints} from '../constants/app'

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
}
