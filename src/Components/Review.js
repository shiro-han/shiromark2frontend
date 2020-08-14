import React from 'react'

const Review = (props) => {
    
    return (
        <div>
            <h3>{props.review.title} | A review for: {props.review.restaurant_name}</h3>
            <h4>by: {props.review.user_name} | Rating: {props.review.rating}</h4>
            <h5>{props.review.created_at}</h5>
            <p>{props.review.content}</p>
        </div>
    )
}

export default Review;