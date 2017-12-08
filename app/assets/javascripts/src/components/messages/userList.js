import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
import Msgs from '../../stores/Msgs'
// import MessagesAction from '../../actions/messages'
import UserStore from '../../stores/userStore'
import FriendStore from '../../stores/friendStore'
import UserAction from '../../actions/users'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    // const users = UserStore.getUsers()
    return {
      users: UserStore.getUsers(),
      friends: FriendStore.getFriends()
      // usersId: Msgs.getUserId(),
      // currentUser,
      // currentUserId,
    }
  }
  componentWillMount() {
    UserStore.onChange(this.onChangeHandler)
  }
  componentWillUnmount() {
    UserStore.offChange(this.onChangeHandler)
  }
  onStoreChange() {
    UserStore.setState(this.getStateFromStore())
    FriendStore.setState(this.getStateFromStore())
  }

  // changeOpenChat(userId) {
  //   // MessagesAction.loadUserMessages(userId)
  //   // const userChatAccess = this.getLastAccess(userId)
  //   // if (userChatAccess) {
  //   //   MessagesAction.updateLastAccess(userId, new Date())
  //   // } else {
  //   //   MessagesAction.createLastAccess(userId, new Date())
  //   // }
  //   // CurrentUserAction.loadCurrentUser()
  // }

  // getLastAccess(toUserId) {
  //   const {currentUser} = this.state
  //   const lastAccess = _.find(currentUser.accesses, {to_user_id: toUserId})
  //   return lastAccess
  // }

  onClickHandler(userId){
    UsersAction.followUsers(userId)
  }

render() {
  const {users, friends} = this.state
  // const friendUsers = _.map(users, (friend) => {
  //   // const messageLength = user.messages.length
  //   // const lastMessage = user.messages[messageLength - 1]
  //   // const userChatAccess = this.getLastAccess(user.id)
  //   // let newMessageIcon
  //   // if (lastMessage) {
  //   //   if (!userChatAccess || lastMessage.created_at > userChatAccess.last_access) {
  //   //     newMessageIcon = (
  //   //       <i className='fa fa-circle new-message-icon' />
  //   //     )
  //   //   }
  //   // }
  //
  //   const itemClasses = classNames({
  //     'user-list__item': true,
  //     'clear': true,
  //     'user-list__item--active': user.id,
  //   })
  //   return (
  //     <li
  //       key={user.id}
  //       className={itemClasses}
  //     >
  //
  //     <form >
  //         <input
  //           name='user_id'
  //           key={user.id}
  //           type='hidden'
  //           value='delete'
  //           />
  //         <input
  //           type='submit'
  //           value='&#xf057;'
  //           className='remove-chat-btn'
  //           />
  //       </form>
  //     { // <div className='user-list__item__picture'>
  //       //   <img src={user.image ? '/user_images/' + user.image : '/assets/images/default_image.jpg'} />
  //       // </div>
  //     }
  //       <div className='user-list__item__details'>
  //         <div className='user-list__item__name'>
  //         {
  //           // {newMessageIcon}
  //         }
  //           <a href={`users/${user.id}`} className='user-list-name'>{user.name}</a>
  //         </div>
  //       </div>
  //     </li>
  //   )
  // }, this)

  return (
      <div className='user-list'>
        <ul className='user-list__list'>
          // {friendUsers}
         </ul>
      </div>
    )
}
}
export default UserList

//     const messageList = []
//     _.each(allMessages, (message) => {
//       const messagesLength = message.messages.length
//       messageList.push({
//         lastMessage: message.messages[messagesLength - 1],
//         lastAccess: message.lastAccess,
//         user: message.user,
//       })
//     })
//     return {
//       messageList: messageList,
//     }
//   }
//   componentWillMount() {
//     Msgs.onChange(this.onStoreChange.bind(this))
//   }
//   componentWillUnmount() {
//     Msgs.offChange(this.onStoreChange.bind(this))
//   }
//   onStoreChange() {
//     this.setState(this.getStateFromStore())
//   }
//
//   changeOpenChat(id) {
//     MessagesAction.changeOpenChat(id)
//   }

  // render() {
//     this.state.messageList.sort((a, b) => {
//       if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
//         return -1
//       }
//       if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
//         return 1
//       }
//       return 0
//     })
//
//     const messages = this.state.messageList.map((message, index) => {
//       const date = Utils.getNiceDate(message.lastMessage.timestamp)
//
//       var statusIcon
//       if (message.lastMessage.from !== message.user.id) {
//         statusIcon = (
//           <i className='fa fa-reply user-list__item__icon' />
//         )
//       }
//       if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
//         statusIcon = (
//           <i className='fa fa-circle user-list__item__icon' />
//         )
//       }
//
//       var isNewMessage = false
//       // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
//       //   isNewMessage = message.lastMessage.from !== UserStore.user.id
//       // }

// lines 97-153: originally after onStoreChange
// onClick={ this.changeOpenChat.bind(this, message.user.id) } originally on line after <li
