import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import SERVER_URL from '../../../constants'
import { Redirect } from 'react-router-dom'

class NewPost extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        content: '',
        title: '',
        returnToProfile: false,
      } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }

    storeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChange(value) {
      this.setState({ content: value })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      // Send the user sign up data to the server
      var token = localStorage.getItem('mernToken')
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      axios.post(`${SERVER_URL}/post`, {content: this.state.content, title: this.state.title}, config)
      .then(response => {
        // Update App with post info
        this.props.updateUser()
        this.setState({returnToProfile: true})
      })
      .catch(err => {
        console.log('ERROR', err)
      })
    }
   
    render() {
      let returnToProfile = this.state.returnToProfile ? <Redirect to={{ pathname: "/profile" }} /> : ""
  
      return (
        <div className="new-entry">
          <form onSubmit={this.handleSubmit}>
            <div>
              {returnToProfile}
              <label>Title: </label>
              <input name="title" placeholder="Title of entry" onChange={this.storeInput} />
            </div>
            <br></br>
            <ReactQuill className="newPostTextBox" name="content" value={this.state.content}
                    onChange={this.handleChange} />
            <br></br>
            <button type="submit">Create</button>
          </form>
        </div>
      )
    }
  }

  export default NewPost 
