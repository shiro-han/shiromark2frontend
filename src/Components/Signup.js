import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

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
        console.log(this.props.error)
        return (
            <div class="sign-up">
                <h1 id="sign-up-title">Signup</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Username*</Form.Label>
                                <Form.Control onChange={this.changeHandler} value={this.state.username} placeholder='Every member must have a unique username...' name='username' type="text" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Password*</Form.Label>
                                <Form.Control onChange={this.changeHandler} value={this.state.password} placeholder='Use capitalization and special characters...' name='password' type='password' />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Display Name*</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.name} placeholder='Enter your name here...' name='name' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.location} placeholder='Where will you be exploring restaurants...' name='location' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile Pic</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.image} placeholder='Enter jpeg or png file name here...' name='image' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.bio}  placeholder="Pork roll or Taylor ham? Hoagie, sub or sammy? Tell us where you're from and a little about you..." name='bio' as="textarea" rows="3"/>
                    </Form.Group>
                    <Button type="submit">Create User</Button> {this.props.error ? <p className="error-message">{this.props.error}</p> : null}

                </Form>
                {/* <form onSubmit={this.submitHandler}>
                    <label>Username* </label>
                    <input onChange={this.changeHandler} value={this.state.username}  name='username' type='text' />
                    <br/>
                    <label>Password* </label>
                    <input onChange={this.changeHandler} value={this.state.password}  name='password' type='password' />
                    <br/>
                    <label>Display Name* </label>
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
                    <input type='submit' value='Create User' />{this.props.error ? <p className="error-message">{this.props.error}</p> : null}
                </form> */}
            </div>
        )
    }
}

export default Signup;