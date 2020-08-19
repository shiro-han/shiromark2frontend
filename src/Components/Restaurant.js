import React from 'react'
import Review from './Review'
import ReviewForm from './ReviewForm'
import {Carousel, Spinner, Button} from 'react-bootstrap'

class Restaurant extends React.Component{

    state = {
        restaurant: null,
        review: false 
    }

    fetchRestaurant = (id) => {
        fetch(`http://localhost:3000/restaurants/${id}`)
            .then(resp => resp.json())
            .then(data => this.setState({ restaurant: data }))
    }

    componentDidMount(){
        this.fetchRestaurant(this.props.match.params.restaurantId)
    }

    reviewClickHandler = () => {
        this.setState({review: !this.state.review})
    }


    render(){
        let restaurant = this.state.restaurant
        return (
        
            <>
                {this.state.restaurant ? 
                    <>
                        <div>
                            <h1>{restaurant.name}</h1>
                            <h3>Address: {restaurant.location}</h3>
                            <h4>Phone: {restaurant.phone}</h4>
                            <h5>Tags: {restaurant.tags.join(', ')}</h5>
                            <Carousel>
                                {restaurant.photos.map(photo => <Carousel.Item key={restaurant.photos.indexOf(photo)}>
                                    <img
                                    className="d-block w-100 carouselImg"
                                    src={photo}
                                    alt={'Photo ' + (restaurant.photos.indexOf(photo) + 1)}
                                    />
                                </Carousel.Item>)}
                            </Carousel>
                            <h2>Reviews:</h2><Button variant="primary" onClick={this.reviewClickHandler}>Create New Review</Button>{' '}
                            <br/>
                            <br/>
                            {this.state.review ? <ReviewForm user={this.props.user} restaurant_id={this.props.match.params.restaurantId}/> : null}
                            {restaurant.reviews.map(review => <Review key={review.id} review={review} current_user={this.props.user} fetchRestaurant={this.fetchRestaurant}/>)}
                        </div>
                        <br/>
                        
                    </>
                    :
                    <div class="spinner">
                        <Spinner animation="border" variant="info" />
                    </div>
                }
            </>
        )
    }
}

export default Restaurant;