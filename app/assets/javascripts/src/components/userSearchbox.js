import React from 'react'
import UserIndex from './userIndex'
import UsersAction from '../actions/users'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      searchString: '',
    }
  }
  handleChange(e) {
    UsersAction.searchUsers(this.state.value)
    this.setState({
      searchString: e.target.value,
    })
  }

  render() {
    const {searchString} = this.state
    return (
      <div className='form-title'>
        <h2>Search Friends</h2>
      <div className='form-wrapper'>
        <input type='text'
                  value={searchString}
                  onChange={this.handleChange.bind(this)}
                  id='search'
            />
          <input type='submit' value='go' id='submit'/>
            <UserIndex {...this.state} />
        </div>
      </div>
   )
  }
}
