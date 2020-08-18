import React from 'react'
import Review from './Review'
import ReviewForm from './ReviewForm'
import {Carousel} from 'react-bootstrap'

class Restaurant extends React.Component{

    state = {
        restaurant: null 
    }

    fetchRestaurant = (id) => {
        fetch(`http://localhost:3000/restaurants/${id}`)
            .then(resp => resp.json())
            .then(data => this.setState({ restaurant: data }))
    }

    componentDidMount(){
        this.fetchRestaurant(this.props.match.params.restaurantId)
    }


    render(){
        let restaurant = this.state.restaurant
        return (
        
            <>
                {this.state.restaurant && this.props.user ? 
                    <>
                        <div>
                            <h1>{restaurant.name}</h1>
                            <p>Phone: {restaurant.phone}</p>
                            <Carousel>
                                {restaurant.photos.map(photo => <Carousel.Item key={restaurant.photos.indexOf(photo)}>
                                    <img
                                    className="d-block w-100 carouselImg"
                                    src={photo}
                                    alt={'Photo ' + (restaurant.photos.indexOf(photo) + 1)}
                                    />
                                </Carousel.Item>)}
                            </Carousel>
                            <p>Reviews:</p>
                            {restaurant.reviews.map(review => <Review key={review.id} review={review} current_user={this.props.user} fetchRestaurant={this.fetchRestaurant}/>)}
                        </div>
                        <br/>
                        <h3>Create New Review</h3>
                        <ReviewForm user={this.props.user} restaurant_id={this.props.match.params.restaurantId}/>
                    </>
                    :
                    <h1>LOADING...</h1>
                }
            </>
        )
    }
}

export default Restaurant;