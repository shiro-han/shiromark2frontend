import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurant from './Restaurant'
import RestaurantPreview from './RestaurantPreview'

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
                <h1>RestaurantContainer</h1>
                <Switch>
                    <Route path={`${this.props.match.url}/:restaurantId`} render={routerProps => <Restaurant {...routerProps} user={this.props.user}/>}/>
                    <Route path={`${this.props.match.url}`} render={() => {
                        if (this.state.restaurants) {
                            return this.state.restaurants.map(restaurant => <RestaurantPreview key={restaurant.id} restaurant={restaurant}/>)
                        } else {
                            return <h1>LOADING...</h1>
                        }
                        } }/>
                </Switch>
                
            </div>
        )
    }
}

export default RestaurantContainer;