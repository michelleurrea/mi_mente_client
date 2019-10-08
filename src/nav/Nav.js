import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
	handleLogout = (e) => {
		e.preventDefault()
		// Remove the token from localstorage (or cookies)
		localStorage.removeItem('mernToken')

		// Update the state of the App
		this.props.updateUser()
	}

	render() {
		let links = ''

		// If user is logged in, show profile page and logout link
		if (this.props.user) {
			links = (
				<span>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<a onClick={this.handleLogout}>Logout</a>
					</li>
				</span>
			)
		}
		else {
			links = (
				<span>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
				</span>
			)
		}
		return(
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					{links}
				</ul>
			</nav>
		)
	}
}

export default Nav