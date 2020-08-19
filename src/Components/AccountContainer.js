import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import Login from './Login'

const AccountContainer = (props) => {
  
    return (
        <>
            <Login submitHandler={props.loginHandler} error={props.error}/>
            <NavLink to="/signup"><p id="no-account">Don't have an account? Sign up here</p></NavLink>
            {/* <Signup submitHandler={props.signupHandler} /> */}
            
        </>
    )
}

export default withRouter(AccountContainer);