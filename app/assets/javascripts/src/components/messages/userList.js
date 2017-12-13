import React from 'react'
// import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
// import Msgs from '../../stores/Msgs'
// import MessagesAction from '../../actions/messages'
// import UserStore from '../../stores/userStore'
import FriendStore from '../../stores/friendStore'
// import UserAction from '../../actions/users'

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
    return {
      friends: FriendStore.getFriends(),
    }
  //   return {
  //     users: UserStore.getUsers(),
  //     // friends: FriendStore.getFriends()
  //     // usersId: Msgs.getUserId(),
  //     // currentUser,
  //     // currentUserId,
  //   }
  }
  componentWillMount() {
  //   UserStore.onChange(this.onChangeHandler)
    FriendStore.onChange(this.onChangeHandler)
  }
  componentWillUnmount() {
    // UserStore.offChange(this.onChangeHandler)
    FriendStore.offChange(this.onChangeHandler)
  }
  onStoreChange() {
  //   UserStore.setState(this.getStateFromStore())
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

  // onClickHandler(userId){
  //   UserAction.followUsers(userId)
  // }

  render() {
    const friends = this.state.friends.map(friend => {
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
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': friend.id,
      })
      return (
        <li
          key={friend.id}
          className={itemClasses}
        >
          <form >
            <input
              name='friend_id'
              key={friend.id}
              type='hidden'
              value='delete'
            />
            <input
              type='submit'
              value='&#xf057;'
              className='remove-chat-btn'
            />
          </form>
          {
            // <div className='user-list__item__picture'>
            //   <img src={user.image ? '/user_images/' + user.image : '/assets/images/default_image.jpg'} />
            // </div>
          }
          <div className='user-list__item__details'>
            <div className='user-list__item__name'>
              {
                // {newMessageIcon}
              }
              <a href={`users/${friend.id}`} className='user-list-name'>{friend.name}</a>
            </div>
          </div>
        </li>
      )
    })

    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {friends}
        </ul>
      </div>
    )
  }
}
export default UserList

// lines 97-153: originally after onStoreChange
// onClick={ this.changeOpenChat.bind(this, message.user.id) } originally on line after <li
