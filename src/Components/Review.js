import React from 'react'
import { NavLink } from 'react-router-dom'

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
    
    // clickHandler = (e) => {
    //     fetch(`http://localhost:3000/reviews/${this.props.review.id}`), {
    //         method: 'DELETE',
    //         // headers: {Authorization: `Bearer ${token}`}
    //     }
    //     .then(window.location.reload())
    // }

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
        console.log(typeof this.state.rating, this.props.review)
        let newReview = ({
            rating: this.state.rating, 
            title: this.state.title, 
            content: this.state.content, 
            id: this.props.review.id, 
            restaurant_id: this.props.review.restaurant_id, 
            user_id: this.props.review.user_id
        })
        console.log(newReview)
        updateReview(newReview)
        // let newReview = (this.state.title, this.state.content)
        // newReview.rating = parseInt(newReview.rating, 10)
        // newReview.user_id = this.props.user.id
        // newReview.restaurant_id = parseInt(this.props.restaurant_id, 10)
        // console.log(this.props.review, newReview)
    }

    updateReview = (newReview) => {
        fetch(`http://localhost:4000/reviews/${this.props.review.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accepts: 'application/json'
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
                    <>
                        <h3>{this.props.review.title} | A review for: <NavLink to={`/restaurants/${this.props.review.restaurant_id}`}>{this.props.review.restaurant_name}</NavLink></h3>
                        <h4>by: <NavLink to={`/users/${this.props.review.user_id}`}>{this.props.review.user_name} </NavLink>| Rating: {this.props.review.rating}</h4>
                        <h5>{this.props.review.created_at}</h5>
                        <p>{this.props.review.content}</p>
                        {this.props.user.id === this.props.review.user_id ? 
                            <div>
                                <button onClick={this.clickHandler}>Delete</button>
                                <button onClick={this.stateChanger}>Edit</button>
                            </div>
                        : null}
                    </>
                    : 
                        <div>
                            <form onSubmit={this.submitHandler}>
                                <input onChange={this.changeHandler} name='title'value={this.state.title} />
                                <input onChange={this.changeHandler} name='rating' value={this.state.rating} type='number' />
                                <input onChange={this.changeHandler} name='content' value={this.state.content} />
                                <input type='submit' value='Submit Review'/>
                            </form>
                            {/* <ReviewForm /> */}
                        </div>
                    }

            </div>
        )
    }
}

export default Review;