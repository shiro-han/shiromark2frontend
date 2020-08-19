import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurant from './Restaurant'
import RestaurantPreview from './RestaurantPreview'
import {Spinner} from 'react-bootstrap'

class RestaurantContainer extends React.Component {

    state = {
        restaurants: null 
    }

    fetchRestaurants = () => {
        fetch(`http://localhost:3000/restaurants/`)
            .then(resp => resp.json())
            .then(data => this.setState({restaurants: data}))
    }

    componentDidMount(){
        this.fetchRestaurants()
    }

    render(){
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/:restaurantId`} render={routerProps => <Restaurant {...routerProps} user={this.props.user}/>}/>
                    <Route path={`${this.props.match.url}`} render={() => {
                        if (this.state.restaurants) {
                            return this.state.restaurants.map(restaurant => <RestaurantPreview key={restaurant.id} restaurant={restaurant}/>)
                        } else {
                            return <Spinner animation="border" variant="info" class="spinner" />

                        }
                        } }/>
                </Switch>
                
            </div>
        )
    }
}

export default RestaurantContainer;