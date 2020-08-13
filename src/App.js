import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Restaurant from './Components/Restaurant'
import UserContainer from './Components/UserContainer'
import AccountContainer from './Components/AccountContainer'
import Signup from './Components/Signup'


class App extends React.Component {

  state = {
    user: null 
  }

  componentDidMount(){
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
        console.log(data.error) //will need to display error on page 
      } else {
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, ()=> this.props.history.push(`/`)) //will want to change this redirect 
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
        console.log(data.error) //will need to display error on page 
      } else {
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, ()=> this.props.history.push(`/`)) //will want to change this redirect 
      }
    })
  }

  logoutHandler = () => {
    localStorage.removeItem("token")
    this.props.history.push("/")
    this.setState({ user: null })
  }

  render() {
    return (
      <>
        <NavBar user={this.state.user} logoutHandler={this.logoutHandler}/>
        <Switch>
          <Route path="/restaurants" render={() => <Restaurant/> } />
          <Route path="/users" render={() => <UserContainer /> } />
          <Route path="/login" render={() => <AccountContainer loginHandler={this.loginHandler} />}/>
          <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler}/>}/>
          <Route path="/" render={() => <Home/>}/>
        </Switch>
      </>
    )
  }
  
}

export default withRouter(App);
