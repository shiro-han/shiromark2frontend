import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import UserContainer from './Components/UserContainer'
import AccountContainer from './Components/AccountContainer'
import RestaurantContainer from './Components/RestaurantContainer'
import Signup from './Components/Signup'
import ProfileContainer from './Components/ProfileContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from 'react-bootstrap'



class App extends React.Component {

  state = {
    user: null, 
    error: ""
  }

  componentDidMount(){
    this.refreshCurrentUser();
  }

  refreshCurrentUser = () => {
    const token = localStorage.getItem("token") //grabs token that is stored after login 
    if (token) { //if a token exists
      //send token to backend to decrypt, 
      fetch("http://localhost:3000/profile", { //route associated is - users controller- profile action which renders current user
        method: "GET", 
        headers: { Authorization: `Bearer ${token}` }, //convention - bearer is type of authentication we are doing
      }) //backend pulls user id from token to find that user and then sends it back
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user})) //which is then used to set state
    } 
  }

  signupHandler = (userObj) => {
    fetch("http://localhost:3000/users", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({ user: userObj })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        // console.log(data.error) //will need to display error on page 
        this.setState({ error: data.error })
      } else {
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, ()=> this.props.history.push(`/`)) 
      }
      
    })
  }

  loginHandler = (userObj) => {
    fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({ user: userObj })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        // console.log(data.error) //will need to display error on page 
        this.setState({ error: data.error })
      } else {
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, ()=> this.props.history.push(`/`)) 
      }
    })
  }

  logoutHandler = () => {
    localStorage.removeItem("token")
    this.props.history.push("/")
    window.alert("See you again soon!")
    this.setState({ user: null })
  }


  render() {
    console.log(this.state.error)
    return (
      <>
        <NavBar user={this.state.user} logoutHandler={this.logoutHandler}/>
        <Switch>
          <Route path="/restaurants" render={routerProps => <RestaurantContainer {...routerProps} user={this.state.user} /> } />
          <Route path="/users" render={routerProps => <UserContainer {...routerProps} current_user={this.state.user} refreshCurrentUser={this.refreshCurrentUser} /> } />
          <Route path="/login" render={() => <AccountContainer loginHandler={this.loginHandler} error={this.state.error}/> } />
          <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} error={this.state.error}/> } />
          <Route path="/profile" render={routerProps => <ProfileContainer {...routerProps} user={this.state.user} /> } />
          <Route path="/" render={() => <Home user={this.state.user}/> } />
        </Switch>
      </>
    )
  }
  
}

export default withRouter(App);
