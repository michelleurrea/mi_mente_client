// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom components
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NewPost from './pages/posts/NewPost'
import UpdatePost from './pages/posts/UpdatePost'
import ShowSinglePost from './pages/posts/ShowSinglePost'
import AllPosts from './pages/AllPosts'

const Content = props => {
	return (
		<div className="container">
			<Route exact path="/" component={Home} />
			<Route path="/profile" render={
				() => <Profile user={props.user} />
			} />
			<Route path="/login" render={
				() => <Login user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/signup" render={
				() => <Signup user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/newpost" render={
				() => <NewPost user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/updatepost" render={
				(props) => <UpdatePost {...props} user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/post" render={
				(props) => <ShowSinglePost {...props} user={props.user} updateUser={props.updateUser} />
			} />
			<Route path="/allposts" render={
				(props) => <AllPosts {...props} user={props.user} updateUser={props.updateUser} />
			} />
		</div>
	)
}

export default Content