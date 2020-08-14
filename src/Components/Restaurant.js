import React from 'react'

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
                {this.state.restaurant ? 
                    <div>
                        <h1>{restaurant.name}</h1>
                        <img src={restaurant.image_url} alt=""/>
                        <p>Phone: {restaurant.phone}</p>
                        



                    </div>
                    :
                    <h1>LOADING...</h1>
                }
            </>
        )
    }
}

export default Restaurant;