import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurant from './Restaurant'
import RestaurantPreview from './RestaurantPreview'
import {Spinner, Container, Row, Col} from 'react-bootstrap'

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
                            return <Container>{
                                    this.state.restaurants.map(restaurant => {
                                        if (this.state.restaurants.indexOf(restaurant) % 2 === 0)
                                            {
                                                let nextRestaurant = this.state.restaurants[this.state.restaurants.indexOf(restaurant) + 1]
                                                if (nextRestaurant) {
                                                    return null
                                                } else {
                                                    return <Row>
                                                        <Col><RestaurantPreview key={restaurant.id} restaurant={restaurant} /></Col>
                                                    </Row>
                                                }
                                            }
                                        else {
                                            let previousRestaurant = this.state.restaurants[this.state.restaurants.indexOf(restaurant) - 1]
                                            return <Row className='restaurantRow'>
                                                <Col><RestaurantPreview key={previousRestaurant.id} restaurant={previousRestaurant} /></Col>
                                                <Col><RestaurantPreview key={restaurant.id} restaurant={restaurant} /></Col>
                                            </Row>
                                        }
                                    })
                                }</Container>
                        } else {
                            return <div class="spinner" ><Spinner animation="border" variant="info" class="spinner" /></div>
                        }
                        } }/>
                </Switch>
                
            </div>
        )
    }
}

export default RestaurantContainer;