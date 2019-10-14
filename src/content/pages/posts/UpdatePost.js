import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../../../constants'


class UpdatePost extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.location.state)
        this.state = {
          content: this.props.location.state.post.content,
          title: this.props.location.state.post.title,
          goBackToPost: false
        } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
      }
  
      storeInput = (e) => {
          this.setState({ [e.target.name]: e.target.value })
      }
  
      handleChange(value) {
        this.setState({ content: value })
      }
  
      submitUpdate = (e) => {
        e.preventDefault()
        // Send the user's token to get through route on server side
        var token = localStorage.getItem('mernToken')
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        let id = this.props.location.state.post.id
        axios.put(`${SERVER_URL}/post/${id}`, { content: this.state.content, title: this.state.title }, config)
        .then(response => {
          // console.log(response)
          this.setState({goBackToPost: true})
        })
        .catch(err => {
          console.log('ERROR', err)
        })
      }
     
      render() {
        let goBackToPost = this.state.goBackToPost ? <Redirect to={{ pathname: "/profile"}} /> : ""
        
        return (
          <div className="new-entry">
            {goBackToPost}
            <form onSubmit={this.submitUpdate}>
              <div>
                <label>Title: </label>
                <input name="title" placeholder={this.state.title} onChange={this.storeInput} />
              </div>
              <ReactQuill className="newPostTextBox" name="content" value={this.state.content}
                      onChange={this.handleChange} />
              <button type="submit">Update</button>
            </form>
          </div>
        )
      }
}

export default UpdatePost;