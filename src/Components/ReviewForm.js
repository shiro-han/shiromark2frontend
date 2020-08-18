import React from 'react';
import {Form, Button} from 'react-bootstrap'
const token = localStorage.getItem("token")

class ReviewForm extends React.Component {
    state = {
        title: "",
        content: "",
        rating: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        if (token) {
            let newReview = this.state;
            newReview.rating = parseInt(newReview.rating, 10);
            newReview.user_id = this.props.user.id;
            newReview.restaurant_id = parseInt(this.props.restaurant_id, 10);
            this.fetchHandler(newReview);
        } else {
            window.alert('You must be logged in to submit a review.')
        }
        
    }

    fetchHandler = (newReview) => {
        fetch(`http://localhost:3000/reviews/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({ review: newReview})
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                title: "",
                content: "",
                rating: ""
            },
            ()=> window.location.reload())
        })

    }

    render(){
        return(
            <Form onSubmit={this.submitHandler}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={this.changeHandler} name='title' value={this.state.title} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control onChange={this.changeHandler} name='rating' value={this.state.rating} type='number' min="1" max="5" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control onChange={this.changeHandler} name='content' value={this.state.content} />
                </Form.Group>
                <Button type='submit'>Submit Review</Button>
            </Form>
        )
    }
}

export default ReviewForm;