import React from 'react';
import {Form, Button} from 'react-bootstrap'
const token = localStorage.getItem("token")

class ReviewForm extends React.Component {
    state = {
        title: "",
        content: "",
        rating: "",
        error: ""
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
            if (data.error) {
              // console.log(data.error) //will need to display error on page 
              this.setState({ error: data.error })
            } else {
                this.setState({
                    title: "",
                    content: "",
                    rating: ""
                }, ()=> window.location.reload())
            } 
        })

    }

    render(){
        return(
            <div class="review-form">
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={this.changeHandler} name='title' value={this.state.title} placeholder="Enter your review title here..."/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control onChange={this.changeHandler} name='rating' value={this.state.rating} type='number' min="1" max="5" placeholder="Enter your rating from 0-5..."/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.changeHandler} name='content' value={this.state.content} placeholder="Share details about your meal and experience here..." />
                    </Form.Group>
                    <Button type='submit'>Submit Review</Button>{this.state.error ? <p class="error-message">{this.state.error}</p> : null}
                </Form>
            </div>
        )
    }
}

export default ReviewForm;