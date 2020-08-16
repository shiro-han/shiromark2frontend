import React from 'react';

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
        let newReview = this.state 
        newReview.rating = parseInt(newReview.rating, 10)
        newReview.user_id = this.props.user.id
        newReview.restaurant_id = parseInt(this.props.restaurant_id, 10)
        this.fetchHandler(newReview);
    }

    fetchHandler = (newReview) => {
        const token = localStorage.getItem("token")
        
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
            <form onSubmit={this.submitHandler}>
                <input onChange={this.changeHandler} name='title'value={this.state.title} />
                <input onChange={this.changeHandler} name='rating' value={this.state.rating} type='number' />
                <input onChange={this.changeHandler} name='content' value={this.state.content} />
                <input type='submit' value='Submit Review'/>
            </form>
        )
    }
}

export default ReviewForm;