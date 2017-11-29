import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  GET_MSGS: null,
  POST_MSGS: null,
  LOAD_USERS: null,
  LOAD_SEARCH_USERS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
}
