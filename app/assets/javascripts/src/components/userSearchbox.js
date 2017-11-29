import React from 'react'
// import UserIndex from './userIndex'
// import UsersAction from '../../actions/users'

export default class Search extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  // }
  //
  // get initialState() {
  //   return {
  //     searchString: '',
  //   }
  // }
  // handleChange(e) {
  //   e.preventDefault()
  //   UsersAction.loadSearchUsers(this.state.value)
  //   this.setState({
  //     searchString: e.target.value,
  //   })
  // }

  render() {
    // const {searchString} = this.state
    return (
      <div className='form-wrapper'>
        <h2>ユーザー検索</h2>
        <div>
          {/*
            // <input type='text'
            //        value={searchString}
            //        onChange={this.handleChange.bind(this)}
            // />
            // <UserIndex {...this.state} />
          */}
        </div>
      </div>
   )
  }
}
// className='form-item'
