import React from 'react';
import axios from 'axios';
import SERVER_URL from '../../../constants';
import { Redirect } from 'react-router-dom';

class ShowSinglePost extends React.Component {
    state = {
        redirect: false,
        backToProfile: false
    }

    updatePost = (post) => {
        this.setState({redirect: true})
    }

    deletePost = (post) => {
        let id = post.id
        var token = localStorage.getItem('mernToken')
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.delete(`${SERVER_URL}/post/${id}`, config)
        .then(response => {
            this.setState({backToProfile: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let content = {__html: this.props.location.state.post.content}

        let redirect = this.state.redirect ? <Redirect to={{ pathname: "/updatepost", state: {post: this.props.location.state.post }}}/> : ""
        let backToProfile = this.state.backToProfile ? <Redirect to={{ pathname: "/profile"}} /> : ""
        
    return (
            <div className="allPostsContainer">
                {redirect}
                {backToProfile}

                <h1>{this.props.location.state.post.title}</h1>
                <div dangerouslySetInnerHTML={content}></div>
                <button onClick={() => this.updatePost(this.props.location.state.post)}>Update</button>,
                <button onClick={() => this.deletePost(this.props.location.state.post)}>Delete</button>
            </div>
        ) 
    } 
}

export default ShowSinglePost;