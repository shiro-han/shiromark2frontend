import React from 'react'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Username </label>
                    <input onChange={this.changeHandler} value={this.state.username}  name='username' type='text' />
                    <br/>
                    <label>Password </label>
                    <input onChange={this.changeHandler} value={this.state.password}  name='password' type='password' />
                    <br/>
                    <input type='submit' value='Login' />
                </form>
            </div>
        )
    }
    
}

export default Login;