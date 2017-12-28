import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
import Msgs from '../../stores/Msgs'
import MessagesAction from '../../actions/messages'
import friendStore from '../../stores/friendStore'
import UserAction from '../../actions/users'
import CurrentUserStore from '../../stores/current_userStore'
// import CurrentUserAction from '../../actions/current_user'

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
    const currentUser = CurrentUserStore.getCurrentUser()
    // if (currentUser.length === 0) return {}
    const currentUserId = currentUser.id
    if (currentUserId) {
      return {
        currentUser,
        currentUserId,
        friends: friendStore.getFriends(),
        openChatId: Msgs.getOpenChatUserId(),
        messages: Msgs.getMsgs(),
      }
    } else {
      return {}
    }
  }

  componentWillMount() {
  //   UserStore.onChange(this.onChangeHandler)
    friendStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
    Msgs.onChange(this.onChangeHandler)
  }
  componentWillUnmount() {
    // UserStore.offChange(this.onChangeHandler)
    friendStore.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
    Msgs.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  changeOpenChat(friendsId) {
    // debugger
    const {currentUser} = this.state
    MessagesAction.changeOpenChat(friendsId)
    MessagesAction.getMsgs(friendsId)
    const userChatAccess = this.getLastAccess(currentUser)
    if (userChatAccess) {
      MessagesAction.updateLastAccess(currentUser.id, new Date()
        // .toUTCString()
      )
    }
    // else {
    //   MessagesAction.createLastAccess(currentUserId, new Date())
    // }
    // CurrentUserAction.getCurrentUser()
  }

  getLastAccess(currentUser) {
    // debugger
    // const {currentUser} = this.state
    const lastAccess = currentUser.last_seen // why lastAccess = 2?
    return lastAccess
  }

  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
    UserAction.deleteFriends(e)
  }

  render() {
    // debugger
    var friendUsers = ''
    if (this.state.friends) {
      const {friends, openChatId, currentUser, messages} = this.state
      let allFriends = friends
      friendUsers = _.map(allFriends, (friend) => {
        const messageLength = messages.length
        const lastMessage = messages[messageLength - 1]
        const userChatAccess = this.getLastAccess(currentUser)
        // console.log(lastMessage)
        let newMessageIcon
        if (lastMessage) {
          // debugger
          // if (lastMessage.sender_id !== friend.id) {
          //   newMessageIcon = (
          //     <i className='fa fa-circle new-message-icon' />
          //   )
          // }
          if (!userChatAccess || lastMessage.created_at > userChatAccess) {
            newMessageIcon = (
              <i className='fa fa-circle new-message-icon' />
            )
          }
        }

        // var isNewMessage = false
        // if (lastMessage.created_at > userChatAccess) {
        //   // isNewMessage =lastMessage.sender_id !== UserStore.user.id
        // }
        const itemClasses = classNames({
          'user-list__item': true,
          'clear': true,
          // 'user-list__item--new': isNewMessage,
          'user-list__item--active': openChatId === friend.id,
        })
        return (
          <li
            key={friend.id}
            onClick={this.changeOpenChat.bind(this, friend.id)}
            className={itemClasses}
          >
            <div >
              <input
                name='friend_id'
                key={friend.id}
                type='hidden'
              />
              <input
                type='submit'
                value=''
                className='remove-chat-btn'
                onClick={this.deleteChatConfirm.bind(this, friend.id, currentUser.id)}
              />
            </div>
            {
            // <div className='user-list__item__picture'>
            //   <img src={user.image ? '/user_images/' + user.image : '/assets/images/default_image.jpg'} />
            // </div>
            }
            <div className='user-list__item__details'>
              <h4 className='user-list__item__name'>
                {friend.name}
              </h4>
              <span className='user-list__item__message'>
                {newMessageIcon}
              </span>
            </div>
            {
            // <div className='user-list__item__details'>
            //   <div className='user-list__item__name'>

            //   </div>
            // </div>
            }
          </li>
        )
      })
    }
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {friendUsers}
        </ul>
      </div>
    )
  }
}
export default UserList

// lines 97-153: originally after onStoreChange
// onClick={ this.changeOpenChat.bind(this, message.user.id) } originally on line after <li
