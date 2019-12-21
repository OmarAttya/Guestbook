import React, { Component } from 'react';
import Register from './Components/Register/Register.js'
import Login from './Components/Login/Login'
import Navigation from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import WriteMessage from'./Components/Home/WriteMessage'
import Replies from './Components/Replies/Replies'
import WriteReplies from './Components/Replies/WriteReplies'
import Cookies from 'js-cookie'
import './App.css';

const initialState = {
  route: 'Login',
  isSignedIn: false
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState
  }
componentDidMount() {
  const cookie = Cookies.get('page')
  if(cookie) {
    this.onRouteChange(cookie)
  }
  if(cookie!== 'Login') {
    this.setState({isSignedIn: true})
  }
}
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'Home' || route === 'WriteMessage') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
        {
          route === 'Home' ?
          <Home onRouteChange = {this.onRouteChange}/>
          : (
              route === 'Login' || route === 'signout'
              ? <Login onRouteChange = {this.onRouteChange}/>
              : (
                  route === 'WriteMessage'
                  ? <WriteMessage onRouteChange={this.onRouteChange}/>
                  :(
                    route === 'Replies'
                    ? <Replies onRouteChange = {this.onRouteChange}/>
                    : (
                      route === 'WriteReplies'
                      ? <WriteReplies onRouteChange = {this.onRouteChange}/>
                      : <Register onRouteChange = {this.onRouteChange} />
                    )
                  )
                )
            )
        }
      </div>
    );
  }
}

export default App;
