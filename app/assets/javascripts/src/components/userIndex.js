import React from 'react'
import _ from 'lodash'
import UserStore from '../stores/userStore'
import UsersAction from '../actions/users'
// import { withRouter } from 'react-router-dom'
// import Utils from '../../utils'

export default class UserList extends React.Component {
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

  onClick(userId) { // onClick のevent には user.id (camelcase で記載)を渡す
    // e.preventDefault()
    UsersAction.followUsers(userId) .then(() => {
      window.location.href = '/'
    })
  }

  render() {
    const {user} = this.state
    const {searchString} = this.props

    let allUsers = user
    const searchUser = searchString.trim().toLowerCase()   // whats the meaning of this code?

    if (searchUser.length > 0) {
      allUsers = _.filter(allUsers, (user) => {
        return user.name.toLowerCase().match(searchUser)
      })
    }

    return (
      <ul className='search_list'>
        {
          _.map(allUsers, (user) => {
            return (
              <div className='userIndex' key={user.id}>
                <li>
                  <form onClick={this.onClick.bind(this, user.id)}> // onClick で user.id の情報をeventに渡してくれ
                  <input name='user_id' key={user.id} type='hidden' />    // ここで渡されてる情報は user.id (key より)
                  <input type='submit' value={user.name} id='users' />
                  </form>
                </li>
              </div>
            )
          })
        }
      </ul>
    )
  }
}
