import React from 'react'
import Msgs from '../../stores/Msgs'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {
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
      value: '',
      receiverId: Msgs.getOpenChatUserId(),
    }
  }

  componentDidMount() {
    Msgs.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    Msgs.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  onSubmit(e) {
    const {value, receiverId} = this.state
    if (value) {
      e.preventDefault()
      MessagesAction.postMsgs(value, receiverId)
      this.setState({
        value: '',
      })
    } else {
      this.setState({
        value: this.state.value + e.submit,
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  uploadImageChat(e) {
    const inputDOM = e.target
    if (!inputDOM.files.length) return
    const file = inputDOM.files[0]
    MessagesAction.saveImageChat(file, this.state.receiverId)
  }

  render() {
    return (
      <div className='reply-box'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            value={ this.state.value }
            onChange={ this.updateValue.bind(this) }
            className='reply-box__input'
            placeholder='Type message to reply..'
          />
          <div className='reply-box__image'>
            <input
              className='image-select-btn'
              type='file'
              ref='image'
              onChange={this.uploadImageChat.bind(this)}
            />
          </div>
          <button type='submit' value='Submit'>Send</button>
        </form>
      </div>
    )
  }
}

export default ReplyBox
