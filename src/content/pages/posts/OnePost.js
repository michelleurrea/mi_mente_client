import React from 'react';
import { Redirect } from 'react-router-dom';

class OnePost extends React.Component {
        state = {
            redirect: false
        }

        showPost = (post) => {
            this.setState({redirect: true})
        }

    render() {
        let redirect = this.state.redirect ? <Redirect to={{ pathname: "/post", state: {post: this.props.post }}}/> : ""

       return (
            <div className="allPostsContainer" onClick={() => this.showPost(this.props.post)}>
                {redirect}

                <h1>{this.props.post.title}</h1>
            </div>
        ) 
    } 
}

export default OnePost;