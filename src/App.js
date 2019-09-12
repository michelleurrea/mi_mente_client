// Import packages
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Header from './nav/Header'
import Nav from './nav/Nav'

class App extends React.Component {
  state = {
    user: null
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav user={this.state.user} />
          <Header />
          <Content />
        </div>
      </Router>
    );
  }
}

export default App;
