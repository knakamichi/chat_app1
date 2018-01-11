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
    var classNames = 'form-wrapper searchBox'
    return (
      <div className='form-title'>
        <h2>Search Friends</h2>
        <div className={classNames}>
          <input type='text'
            value={searchString}
            onChange={this.handleChange.bind(this)}
            id='search'
          />
          <UserIndex {...this.state} />
        </div>
      </div>
    )
  }
}
