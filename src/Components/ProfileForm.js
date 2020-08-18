import React from 'react'
const token = localStorage.getItem("token")


class ProfileForm extends React.Component{

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
                accepts: 'application/json',
                Authorization: `Bearer ${token}`,
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

    render() {
        return (
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
            </div>
        )
    }
}

export default ProfileForm;