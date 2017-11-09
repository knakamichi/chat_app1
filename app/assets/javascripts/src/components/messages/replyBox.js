import React from 'react'
import Msgs from '../../stores/Msgs'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

get initialState() {
  return {
    value: '',
  }
}
handleKeyDown(e) {
  if (e.keyCode === 13) {
    // MessagesAction.sendMessage(Msgs.getMsgs(), this.state.value)
    this.setState({
      value: '',
    })
  } else {
    this.setState({
      value: this.state.value + e.key,
    })
  }
}

updateValue(e) {
  this.setState({
    value: e.target.value,
  })
}

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value } // 入力内容。
          onKeyDown={ this.handleKeyDown.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
