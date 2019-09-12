// Import packages
import axios from 'axios'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Header from './nav/Header'
import Nav from './nav/Nav'
import SERVER_URL from './constants'

class App extends React.Component {
  state = {
    user: null
  }

  compnentDidMount() {
    // Go look for a token
    this.getUser()
  }

  getUser = () => {
    // See if there IS a token
    let token = localStorage.getItem('mernToken')

    // If there is a token, try to use it to get the user info
    if (token) {
      console.log('token was', token)
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('Success', response)
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log('Error with token', err)
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav user={this.state.user} />
          <Header />
          <Content updateUser={this.getUser} user={this.state.user} />
        </div>
      </Router>
    );
  }
}

export default App;
