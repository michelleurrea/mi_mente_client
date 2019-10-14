// Import packages
import axios from 'axios'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Nav from './nav/Nav'
import SERVER_URL from './constants'
import Footer from './nav/Footer'

class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    // Go look for a token
    this.getUser()
  }

  getUser = () => {
    // See if there IS a token
    let token = localStorage.getItem('mernToken')

    // If there is a token, try to use it to get the user info
    if (token) {
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log('Error with token', err)
      })
    }
    else {
      this.setState({ user: null })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav updateUser={this.getUser} user={this.state.user} />
          <Content updateUser={this.getUser} user={this.state.user} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
