import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Msgs from '../../stores/Msgs'
import MessagesAction from '../../actions/messages'
import friendStore from '../../stores/friendStore'
import UserAction from '../../actions/users'
import CurrentUserStore from '../../stores/current_userStore'

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
    friendStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
    Msgs.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    friendStore.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
    Msgs.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  changeOpenChat(friendsId) {
    const {currentUser} = this.state
    MessagesAction.changeOpenChat(friendsId)
    MessagesAction.getMsgs(friendsId)
    const userChatAccess = this.getLastAccess(currentUser)
    if (userChatAccess) {
      MessagesAction.updateLastAccess(currentUser.id, new Date()
      )
    }
  }

  getLastAccess(currentUser) {
    const lastAccess = currentUser.last_seen
    return lastAccess
  }

  deleteChatConfirm(e) {
    if (confirm('Are you sure you want to unfriend?')) {
      UserAction.deleteFriends(e)
      MessagesAction.deleteMsgs(e)
    }else{
      (e).preventDefault()
    }
  }

  render() {
    var friendUsers = ''
    if (this.state.friends) {
      const {friends, openChatId, currentUser} = this.state
      let allFriends = friends
      friendUsers = _.map(allFriends, (friend) => {
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
                className= 'remove-chat-btn'
                onClick={this.deleteChatConfirm.bind(this, friend.id, currentUser.id)}
              />
            </div>
            <div className='user-list__item__picture'>
              <img src={friend.image.thumb.url} />
            </div>

            <div className='user-list__item__details'>
              <h4 className='user-list__item__name'>
                {friend.name}
              </h4>
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
