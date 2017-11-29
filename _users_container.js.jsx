// var UsersContainer = React.createClass({
// 	componentWillMount(){
// 		this.fetchUsers();
// 	},
//
// 	fetchUsers() {
//
// 		$.ajax({
// 	      url: this.props.usersPath,
//
// 	      dataType: 'json',
//
// 	      success: function(data) {
// 	        this.setState({users: data});
// 	      }.bind(this),
//
// 	      error: function(data) {
// 	      	this.setState({users: []});
// 	      }.bind(this)
// 	    });
// 	},
//
// 	searchUsers(event) {
// 		if (e.target.value) {
// 			$.ajax({
// 		      url: this.props.searchPath+"?query="+e.target.value,
//
// 		      dataType: 'json',
//
// 		      success: function(data) {
// 		        this.setState({users: data});
// 		      }.bind(this),
//
// 		      error: function(data) {
// 		      	this.setState({users: []});
// 		      }.bind(this)
// 		    });
// 		}
// 		else{
// 			this.fetchUsers();
// 		}
//
// 	},
//
// 	getInitialState() {
// 		return { users: [] };
// 	},
//
// 	render() {
//
// 		return (
// 			<div>
// 				<Users users={this.state.users} />
// 				<UsersSearch searchPath={this.props.searchPath} submitPath={this.searchUsers} cancelPath={this.fetchUsers}/>
// 			</div>
// 			);
//
// 	}
// });
