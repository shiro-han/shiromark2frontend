import React from 'react'
import {Redirect, NavLink} from 'react-router-dom'

const Profile = (props) => {
    return (
    <>
        {props.user ? 
            <div>
                <h1>{props.user.name}</h1>
                <h3>Has {props.user.reviews.length} reviews</h3>
                <img src={props.user.image} alt='chicken' />
                <p>{props.user.bio}</p>
                <NavLink to={`/users/${props.user.id}`}>View Public Profile Page</NavLink>
            </div>
        :
            <Redirect to="/login" /> //bug with refreshing and App state here
        }
    </>
        
        )
}

export default Profile;