import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import logo from './mi_mente_logo.png'

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
					<li>
						<Link to="/newpost">New Post</Link>
					</li>
					<li>
						<Link to="/allposts">All Posts</Link>
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
			<div className="containerTop">
					<Link to="/">
						<img className="logo" src={logo} ></img>
					</Link>
				<nav>
					<ul>
						<Link to="/">Home</Link>
						{links}
					</ul>
				</nav>
			</div>
		)
	}
}

export default Nav