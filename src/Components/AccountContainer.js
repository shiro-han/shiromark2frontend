import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'

const AccountContainer = (props) => {
  
    return (
        <>
            <Login submitHandler={props.loginHandler}/>
            <NavLink to="/signup"><p>Don't have an account? Sign up here</p></NavLink>
            {/* <Signup submitHandler={props.signupHandler} /> */}
            
        </>
    )
}

export default withRouter(AccountContainer);