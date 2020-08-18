import React from 'react'

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        name: '',
        location: '',
        image: '',
        bio: ''
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        let newUser = this.state 
        if (newUser.image === '') {
            newUser.image = 'https://i2.wp.com/lawsontravel.com/wp-content/uploads/2017/07/cropped-blank-profile-picture-973460_640.png'
        }
        this.props.submitHandler(newUser)
    }

    render() {
        return (
            <div>
                <h1>Signup</h1>
                <form onSubmit={this.submitHandler}>
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
                    <input type='submit' value='Create User' />
                </form>
            </div>
        )
    }
}

export default Signup;