import React from 'react'
import { Redirect } from 'react-router-dom'
import OnePost from './posts/OnePost'
import axios from 'axios'
import SERVER_URL from '../../constants'

class Profile extends React.Component {
	state = {
		posts: []
	}

	getPosts = () => {
		// See if there IS a token
		let token = localStorage.getItem('mernToken')
		// If there is a token, try to use it to get the user info
		if (token) {
			axios.get(`${SERVER_URL}/post`, {
			headers: { 'Authorization': `Bearer ${token}` }
			})
			.then(response => {
			this.setState({ posts: response.data })
			})
			.catch(err => {
			console.log('Error with token', err)
			})
		}
		else {
			this.setState({ user: null })
		}
	}

	componentDidMount() {
		this.getPosts()
	}

	render() {
		let allPosts = this.state.posts.map((p, i) => {
			return <OnePost key={i}
				post={p}
			/>
		})

		if (!this.props.user) {
			return <Redirect to="/" />
		}
		
		let message = this.state.posts.length === 0 ? "There are currently no posts." : ""

	return (
		<div className="profileContainer">
			<div className="profileDetails">
				<h1>Welcome to {this.props.user.firstName}'s page</h1>
				<p>Preffered pronouns are: {this.props.user.pronouns}</p>
				<p>Email: {this.props.user.email}</p>
			</div>
			<br></br>
			<div className="postDetails">
				<div>
					{allPosts}
					<h1>{message}</h1>
				</div>
			</div>
		</div>
	)
}
}

export default Profile;