import React from 'react'
import CommentContainer from './CommentContainer'
import { NavLink } from 'react-router-dom'
import { Media, Card, Modal, Button, Form } from 'react-bootstrap'
const token = localStorage.getItem("token")

class Review extends React.Component{

    state = {
        showMode: true,
        title: "",
        content: "",
        rating: "",
        error: "" 
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }
    
    deleteFn = (e) => {
        fetch(`http://localhost:3000/reviews/${this.props.review.id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(resp => resp.json())
        .then(window.location.reload())
    }

    stateChanger = ()=> {
        this.setState({
            showMode: !this.state.showMode,
            title: this.props.review.title, 
            content: this.props.review.content,
            rating: this.props.review.rating
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        let newReview = ({
            rating: parseInt(this.state.rating, 10), 
            title: this.state.title, 
            content: this.state.content, 
            id: this.props.review.id, 
            restaurant_id: this.props.review.restaurant_id, 
            user_id: this.props.review.user_id
        })
        this.updateReview(newReview)
    }

    updateReview = (newReview) => {
        fetch(`http://localhost:3000/reviews/${newReview.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                accepts: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ review: newReview})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.error) {
              // console.log(data.error) //will need to display error on page 
              this.setState({ error: data.error })
            } else {
                window.location.reload()
            }
        })
    }

    render() {
        return (
            <div>
                <Media>
                    <Card style={{ width: '8rem' }}>
                        <Card.Img variant="top" src={this.props.review.user_image} />
                        <Card.Body>
                            <Card.Text className='cardTitleReview'><h6><NavLink to={`/users/${this.props.review.user_id}`}>{this.props.review.user_name} </NavLink></h6></Card.Text>
                        </Card.Body>
                    </Card>
                    <Media.Body>
                    <h2>Rating:
                        <span className='stars'>
                            {Array(this.props.review.rating).fill(0).map(e => <span class="fa fa-star checked"></span>)}
                            {5 - this.props.review.rating > 0 ? Array(5 - this.props.review.rating).fill(0).map(e => <span class="fa fa-star"></span>) : null}
                        </span>
                    </h2>
                    <h3>{this.props.review.title} | Restaurant: <NavLink to={`/restaurants/${this.props.review.restaurant_id}`}>{this.props.review.restaurant_name}</NavLink></h3>
                    <h5>{this.props.review.created_at.split('T')[0]}</h5>
                    {this.props.current_user && this.props.current_user.id === this.props.review.user_id ? 
                        <div>
                            <button onClick={this.stateChanger}>Edit</button>
                            <button onClick={this.deleteFn}>Delete</button>
                        </div>
                    : null}
                    <p>{this.props.review.content}</p>
                    <CommentContainer review_id={this.props.review.id} comments={this.props.review.comments} current_user={this.props.current_user} refreshData={this.props.refreshData} />
                    </Media.Body>
                </Media>
                <Modal show={!this.state.showMode} onHide={this.stateChanger}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editing Your Review</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.submitHandler}>
                        <Modal.Body>
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
                        </Modal.Body>
                        <Modal.Footer>
                        {this.state.error ? <p class="error-message">{this.state.error}</p> : null} 
                        <Button variant="secondary" onClick={this.stateChanger}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Submit Review
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Review;