import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
import Msgs from '../../stores/Msgs'
import MessagesAction from '../../actions/messages'
import friendStore from '../../stores/friendStore'
import UserAction from '../../actions/users'
import CurrentUserStore from '../../stores/current_userStore'
import CurrentUserAction from '../../actions/current_user'

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
    MessagesAction.getMsgs(friendsId)
    // const userChatAccess = this.getLastAccess(userId)
    // if (userChatAccess) {
    //   MessagesAction.updateLastAccess(userId, new Date())
    // } else {
    //   MessagesAction.createLastAccess(userId, new Date())
    // }
    CurrentUserAction.getCurrentUser()
  }

  // getLastAccess(toUserId) {
  //   const {currentUser} = this.state
  //   const lastAccess = _.find(currentUser.accesses, {to_user_id: toUserId})
  //   return lastAccess
  // }

  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
    UserAction.deleteFriends(e)
  }

  render() {
    var friendUsers = ''
    if (this.state.friends) {
      const {friends, openChatId} = this.state
      let allFriends = friends
      friendUsers = _.map(allFriends, (friend) => {
        // const messageLength = friend.messages.length
        // const lastMessage = friend.messages[messageLength - 1]
        // let newMessageIcon
        // if (lastMessage) {
        //   if (!userChatAccess || lastMessage.created_at > userChatAccess.last_access) {
        //     newMessageIcon = (
        //       <i className='fa fa-circle new-message-icon' />
        //     )
        //   }

        const itemClasses = classNames({
          'user-list__item': true,
          'clear': true,
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
                onClick={this.deleteChatConfirm.bind(this, friend.id)}
              />
            </div>
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
                <a className='user-list-name'>{friend.name}</a>
              </div>
            </div>
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
