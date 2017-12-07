import React from 'react'
import classNames from 'classNames'
import Msgs from '../../stores/Msgs'
import ReplyBox from '../../components/messages/replyBox'
// import Utils from '../../utils'

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
      messages: Msgs.getMsgs(),
    }
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())   // 変更しろ！（openchat関連）
  }
  componentWillMount() {
    Msgs.onChange(this.onChangeHandler)
  }
  componentWillUnmount() {
    Msgs.offChange(this.onChangeHandler)
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

render() {
  const messages = this.state.messages.map(message => {
    const messageClasses = classNames({
      'message-box__item': true,
      // 'message-box__item--from-current': message.user_id === current_user.id,
      'clear': true,
    })
    return (
         <li key={message.id} className={messageClasses}>
           <div className='message-box__item__contents'>
             {message.content}
           </div>
         </li>
       )
  })

  return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {messages}
        </ul>
        <ReplyBox />,
      </div>
    )
}
}

export default MessagesBox
