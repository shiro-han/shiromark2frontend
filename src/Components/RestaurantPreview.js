import React from 'react'
import { NavLink } from 'react-router-dom';
import {Card} from 'react-bootstrap'

const RestaurantPreview = (props) => {

    return (
        <>
            {props.restaurant ? 
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant='top' src={props.restaurant.photos[0]}/>
                    <Card.Body>
                        <Card.Title> <NavLink to={`restaurants/${props.restaurant.id}`}>{props.restaurant.name}</NavLink> | {props.restaurant.price}</Card.Title>
                        <Card.Subtitle>{props.restaurant.location}</Card.Subtitle>
                        <Card.Text>{props.restaurant.tags.join(', ')}</Card.Text>
                    </Card.Body>
                </Card>
            :
                <h1>LOADING...</h1>
            }
        </>
    )
}

export default RestaurantPreview;