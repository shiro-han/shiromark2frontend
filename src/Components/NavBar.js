import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {
    return (
    <div>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/restaurants"> Restaurants </NavLink>
        {props.user ?
            <>
                {/* <NavLink to={`/users/${props.user.id}`}><button> My Profile {props.user.name} </button> </NavLink>  */}
                <NavLink to={'/profile'}><button> My Profile </button></NavLink>
                <button onClick={props.logoutHandler}> Log Out </button>
            </>
        :
            <NavLink to="/login"><button> Log In </button></NavLink>
        }
    </div>
    )
}

export default NavBar;