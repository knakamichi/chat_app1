import React from 'react'
import classNames from 'classNames'
import Msgs from '../../stores/Msgs'
import CurrentUserStore from '../../stores/current_userStore'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {
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
      messages: Msgs.getMsgs(Msgs.getOpenChatUserId()),
      currentUser: CurrentUserStore.getCurrentUser(),
    }
  }
  componentWillMount() {
    Msgs.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
  }
  componentWillUnmount() {
    Msgs.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const {messages, currentUser} = this.state
    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.sender_id === currentUser.id,
        'clear': true,
      })

      return (
        <li key={message.id} className={messageClasses}>
          <div className='message-box__item__contents'>
            {message.content}
            {message.image ? <img className='image-message' src={message.image.thumb.url} /> : message.content}
          </div>
        </li>
      )
    })

    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {userMessages}
        </ul>
        <ReplyBox />,
      </div>
    )
  }
}

export default MessagesBox
