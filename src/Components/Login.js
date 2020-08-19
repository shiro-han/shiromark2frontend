import React from 'react'
import {Form, Button} from 'react-bootstrap'

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
            <div class="sign-up">
                <h1>Login</h1>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group>
                            <Form.Label>Username*</Form.Label>
                            <Form.Control onChange={this.changeHandler} value={this.state.username} placeholder='Enter your username...' name='username' type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password*</Form.Label>
                            <Form.Control onChange={this.changeHandler} value={this.state.password} placeholder='Enter your password...' name='password' type='password' />
                        </Form.Group>
                        <Button type="submit" value='Login'>Login</Button> {this.props.error ? <p class="error-message">{this.props.error}</p> : null}
                    </Form>


                {/* <form onSubmit={this.submitHandler}>
                    <label>Username </label>
                    <input onChange={this.changeHandler} value={this.state.username}  name='username' type='text' />
                    <br/>
                    <label>Password </label>
                    <input onChange={this.changeHandler} value={this.state.password}  name='password' type='password' />
                    <br/>
                    <input type='submit' value='Login' /> {this.props.error ? <p class="error-message">{this.props.error}</p> : null}
                </form> */}
            </div>
        )
    }
    
}

export default Login;