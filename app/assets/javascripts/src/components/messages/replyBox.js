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
onSubmit(e) {
  // if (e.keyCode === 13) {
  e.preventDefault()      // html経由の入力によって発生する同期処理を止め、非同期処理に移る。
    MessagesAction.postMsgs(this.state.value)
    this.setState({
      value: '',
    })
  // }
  // } else {
  //   this.setState({
  //     value: this.state.value + e.key,    意味：入力された値 + 押されたキー ＝ 二重入力
  //   })
  // }
}

updateValue(e) {
  // debugger
  this.setState({
    value: e.target.value,
  })
}

  render() {
    return (
      <div className='reply-box'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            value={ this.state.value } // 入力内容をvalue(=textarea)に代入
            // onKeyDown={ this.handleKeyDown.bind(this) } これをかくと、押されたキーがenterキーかどうかを判断しなければならない（e.keycode)
            onChange={ this.updateValue.bind(this) }
            className='reply-box__input'
            placeholder='Type message to reply..'
          />
          <button type="submit" value="Submit">Send</button>
        </form>
      </div>
    )
  }
}

export default ReplyBox
