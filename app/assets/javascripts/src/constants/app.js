import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  GET_MSGS: null,
  POST_MSGS: null,
  GET_USERS: null,
  SEARCH_USERS: null,
  GET_FRIENDS: null,
  GET_CURRENT_USER: null,
  SAVE_IMAGE_CHAT: null,
  CHANGE_OPEN_CHAT: null,
  GET_ALL_MSGS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  RELATIONSHIPS: APIRoot + '/relationships',
  CURRENT_USER: APIRoot + '/current_user',
  FRIENDS: APIRoot + '/friends',
  FRIENDREQUEST: APIRoot + '/friendrequest',
}
