import React from 'react'
// import _ from 'lodash'
// import Msgs from '../../stores/Msgs'
// import CurrentUserStore from '../../stores/current_userStore'
import UserList from './userList'
import MessagesBox from './messagesBox'

class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  //   this.onChangeHandler = this.onStoreChange.bind(this)
  // }
  //
  // get initialState() {
  //   return this.getStateFromStores()
  // }
  //
  // getStateFromStores() {
  //   debugger
  //   const openChatId = Msgs.getOpenChatUserId()
  //   const currentUser = CurrentUserStore.getCurrentUser()
  //   if (!currentUser) return {}
  //   const currentUserMessages = currentUser.messages ? currentUser.messages : []
  //   const currentUserMessagesToUser = _.filter(currentUserMessages, {receiverId: openChatId})
  //   const users = Msgs.getMsgs()
  //   const openUserMessages = users.messages ? users.messages : []
  //   const allMessages = _.concat(currentUserMessagesToUser, openUserMessages)
  //   const messages = _.sortBy(allMessages, (message) => { return message.created_at })
  //
  //   return {
  //     currentUser,
  //     messages,
  //   }
  // }
  //
  // componentDidMount() {
  //   Msgs.onChange(this.onChangeHandler)
  //   CurrentUserStore.onChange(this.onChangeHandler)
  // }
  //
  // componentWillUnmount() {
  //   Msgs.offChange(this.onChangeHandler)
  //   CurrentUserStore.offChange(this.onChangeHandler)
  // }
  //
  // onStoreChange() {
  //   this.setState(this.getStateFromStores())
  // }
  render() {
    return (
      <div className='app'>
        <UserList />
        <MessagesBox />
      </div>
    )
  }
}

export default App
