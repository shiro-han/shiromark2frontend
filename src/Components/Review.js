import React from 'react'
import { NavLink } from 'react-router-dom'

class Review extends React.Component{

    state = {editMode: false}
    
    clickHandler = (e) => {
        fetch(`http://localhost:3000/reviews/${}rops.review.id`), {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        }
        .then(window.location.reload())
    }

    render() {
        return (
            <div>
                {/* {this.state.editForm ?} */}
                <h3>{props.review.title} | A review for: <NavLink to={`/restaurants/${props.review.restaurant_id}`}>{props.review.restaurant_name}</NavLink></h3>
                <h4>by: <NavLink to={`/users/${props.review.user_id}`}>{props.review.user_name} </NavLink>| Rating: {props.review.rating}</h4>
                <h5>{props.review.created_at}</h5>
                <p>{props.review.content}</p>
                {props.user.id === props.review.user_id ? 
                <button onClick={clickHandler}>Delete</button>
                : null}

            </div>
        )
    }
}

export default Review;