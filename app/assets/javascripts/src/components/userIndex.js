import React from 'react'
import _ from 'lodash'
import UserStore from '../stores/userStore'
import UsersAction from '../actions/users'

export default class UserIndex extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {user: UserStore.getUsers()}
  }

  componentDidMount() {
    UserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    UserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  onClickHandler(userId) {
    UsersAction.sendFriendRequest(userId)
    window.location.href = '/'
  }

  render() {
    const {user} = this.state

    const {searchString} = this.props

    let allUsers = user
    const searchUser = searchString.trim().toLowerCase()
    if (searchUser.length > 0) {
      allUsers = _.filter(allUsers, (user) => {
        return user.name.toLowerCase().match(searchUser)
      })
    } else {
      return null
    }

    return (
      <ul className='search_list'>
        {
          _.map(allUsers, (user) => {
            return (
              <div className='userIndex' key={user.id}>
                <li>
                  <div onClick={this.onClickHandler.bind(this, user.id)}>
                    <input name='user_id' key={user.id} type='hidden' />
                    <input type='submit' value={user.name} id='users' />
                  </div>
                </li>
              </div>
            )
          })
        }
      </ul>
    )
  }
}
