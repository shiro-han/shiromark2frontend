import React from 'react'

const RestaurantPreview = (props) => {

    return (
        <>
            {props.restaurant ? 
                <div>
                    <h3>{props.restaurant.name} | {props.restaurant.price}</h3>
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