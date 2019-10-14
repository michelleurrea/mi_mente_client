// Packages
import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom'
import SERVER_URL from '../../constants'

class Signup extends React.Component {
	state = {
		userName: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		pronouns: '',
	}

	storeInput = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		// Send the user sign up data to the server
		axios.post(`${SERVER_URL}/auth/signup`, this.state)
		.then(response => {
			// Store Token in localStorage
			localStorage.setItem('mernToken', response.data.token)

			// Update App with user info
			this.props.updateUser()
		})
		.catch(err => {
			this.setState({
				message: `${err.response.status}: ${err.response.data.message}`
			})
		})
	}

	render() {
		if (this.props.user) {
			return <Redirect to="/" />
		}

		return (
			<div className="signUpForm">
				<h2>Signup</h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Username: </label>
						<input name="userName" placeholder="Your username" onChange={this.storeInput} />
					</div>
					<br></br>
					<div>
						<label>First Name: </label>
						<input name="firstName" placeholder="Your first name" onChange={this.storeInput} />
					</div>
					<br></br>
					<div>
						<label>Last Name: </label>
						<input name="lastName" placeholder="Your last name" onChange={this.storeInput} />
					</div>
					<br></br>
					<div>
						<label>Email: </label>
						<input name="email" type="email" onChange={this.storeInput} />
					</div>
					<br></br>
					<div>
						<label>Password: </label>
						<input name="password" type="password" onChange={this.storeInput} />
					</div>
					<br></br>
					<div>
						<label>Pronouns (comma seperated): </label>
						<input name="pronouns" placeholder="Your pronouns" onChange={this.storeInput} />
					</div>
					<br></br>
					<button type="submit">Let's get real!</button>
				</form>
			</div>
		)
	}
}

export default Signup