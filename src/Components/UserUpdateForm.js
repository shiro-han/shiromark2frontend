import React from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
const token = localStorage.getItem("token")

class UserUpdateForm extends React.Component{

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
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Editing Your Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.submitHandler} >
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.username}  name='username' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.password}  name='password' type='password'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.name}  name='name' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.location}  name='location' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile Pic</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.image}  name='image' type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control onChange={this.changeHandler} value={this.state.bio}  name='bio' type='text' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModals}>
                    Close
                </Button>
                    <Button type='submit' >Submit</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default UserUpdateForm;