import React from 'react'
import Review from './Review'

const ProfileReviews = (props) => {
    console.log(props)
    return (
        <div>
            {props.user.reviews.map(review => <Review review={review} user={props.user}/>)}
        </div>
    )
}

export default ProfileReviews;