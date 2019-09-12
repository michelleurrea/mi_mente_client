// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom components
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'

const Content = props => {
	return (
		<div className="container">
			<Route exact path="/" component={Home} />
			<Route path="/profile" component={Profile} />
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
		</div>
	)
}

export default Content