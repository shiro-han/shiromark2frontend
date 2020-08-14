import React from 'react'
import {Redirect, NavLink} from 'react-router-dom'

class Profile extends React.Component {
    state = {
        username: this.props.user.username,
        password: this.props.user.password,
        name: this.props.user.name,
        location: this.props.user.location,
        image: this.props.user.image,
        bio: this.props.user.bio
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.updateUser(this.state)
    }

    updateUser = (userObj) => {
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({ user: userObj})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.error) {
                console.log(data.error) //will need to display on page 
            } else {
                console.log(data) //NEED TO ADD UPDATE IN BACKEND AND DECIDE WHERE TO REROUTE HERE 
            }
        })
    }

    render(){
        let user = this.props.user 
        console.log(this.props.user)
        return (
            <>
                {this.props.user ? 
                    <>
                        <div>
                            <h1>Edit Profile</h1>
                            <form onSubmit={this.submitHandler} >
                                <label>Username </label>
                                <input onChange={this.changeHandler} value={this.state.username}  name='username' type='text' />
                                <br/>
                                <label>Password </label>
                                <input onChange={this.changeHandler} value={this.state.password}  name='password' type='password' />
                                <br/>
                                <label>Display Name </label>
                                <input onChange={this.changeHandler} value={this.state.name}  name='name' type='text' />
                                <br/>
                                <label>Location </label>
                                <input onChange={this.changeHandler} value={this.state.location}  name='location' type='text' />
                                <br/>
                                <label>Profile Pic </label>
                                <input onChange={this.changeHandler} value={this.state.image}  name='image' type='text' />
                                <br/>
                                <label>Bio </label>
                                <input onChange={this.changeHandler} value={this.state.bio}  name='bio' type='text' />
                                <br/>
                                <input type='submit' value='Edit Profile' />
                            </form>



                            
                            {/* /* <h1>{props.user.name}</h1>
                            <h3>Has {props.user.reviews.length} reviews</h3>
                            <img src={props.user.image} alt='chicken' />
                            <p>{props.user.bio}</p> */ }
                        </div>
                        <NavLink to={`/users/${user.id}`}>View Public Profile Page</NavLink>
                    </>
                :
                    <Redirect to="/login" /> //bug with refreshing and App state here
                }
            </>
        
        )
    }
}


export default Profile;