import React from 'react'
import { NavLink } from 'react-router-dom';

const RestaurantPreview = (props) => {

    return (
        <>
            {props.restaurant ? 
                <div>
                    <h3> <NavLink to={`restaurants/${props.restaurant.id}`}>{props.restaurant.name}</NavLink> | {props.restaurant.price}</h3>
                    <h4>{props.restaurant.location}</h4>
                    <ul>{props.restaurant.tags.map(tag => <li>{tag}</li>)}</ul>
                </div>
            :
                <h1>LOADING...</h1>
            }
        </>
    )
}

export default RestaurantPreview;