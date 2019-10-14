import React from 'react';
import OnePost from './posts/OnePost';
import axios from 'axios';
import SERVER_URL from '../../constants';

class AllPosts extends React.Component {
    state = {
        posts: []
    }

    getAllPosts = () => {
		// See if there IS a token
		let token = localStorage.getItem('mernToken')
		// If there is a token, try to use it to get the user info
		if (token) {
			axios.get(`${SERVER_URL}/post/allposts`, {
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
		this.getAllPosts()
    }
    
    render() {
        let allPosts = this.state.posts.map((p, i) => {
			return <OnePost key={i}
				post={p}
			/>
        })
        
        return (
            <div className="postDetails">
                {allPosts}
            </div>
        )
    }
}

export default AllPosts;