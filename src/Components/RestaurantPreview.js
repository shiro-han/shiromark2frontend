import React from 'react'
import { NavLink } from 'react-router-dom';
import {Card, Spinner} from 'react-bootstrap'

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
                <Spinner animation="border" variant="info" class="spinner" />

            }
        </>
    )
}

export default RestaurantPreview;