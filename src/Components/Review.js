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
        rating: "" 
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
        .then(console.log)
    }

    render() {
        return (
            <div>
                {this.state.showMode ? 
                    <Media>
                        <Card style={{ width: '8rem' }}>
                            <Card.Img variant="top" src={this.props.review.user_image} />
                            <Card.Body>
                                <Card.Title><NavLink to={`/users/${this.props.review.user_id}`}>{this.props.review.user_name} </NavLink></Card.Title>
                            </Card.Body>
                            </Card>
                        <Media.Body>
                        <h3>{this.props.review.title} | A review for: <NavLink to={`/restaurants/${this.props.review.restaurant_id}`}>{this.props.review.restaurant_name}</NavLink></h3>
                        <h4>Rating: {this.props.review.rating}</h4>
                        <h5>{this.props.review.created_at}</h5>
                        {this.props.current_user && this.props.current_user.id === this.props.review.user_id ? 
                            <div>
                                <button onClick={this.deleteFn}>Delete</button>
                                <button onClick={this.stateChanger}>Edit</button>
                            </div>
                        : null}
                        <p>{this.props.review.content}</p>
                        <CommentContainer review_id={this.props.review.id} comments={this.props.review.comments} current_user={this.props.current_user} fetchRestaurant={() => this.props.fetchRestaurant(this.props.review.restaurant_id)} />
                        </Media.Body>
                    </Media>
                    : 
                        
                        <div>
                            <Modal show={!this.state.showMode} onHide={this.stateChanger}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Editing Your Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={this.submitHandler}>
                                    <input onChange={this.changeHandler} name='title' value={this.state.title} />
                                    <input onChange={this.changeHandler} name='rating' value={this.state.rating} type='number' />
                                    <input onChange={this.changeHandler} name='content' value={this.state.content} />
                                    <input type='submit' value='Submit Edit'/>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.stateChanger}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.stateChanger}>
                                    Save Changes
                                </Button>
                                </Modal.Footer>
                            </Modal>   
                            
                        </div>
                    }
            </div>
        )
    }
}

export default Review;