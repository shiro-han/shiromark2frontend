import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurant from './Restaurant'

const RestaurantContainer = (props) => {
    return (
        <div>
            <Switch>
                <Route path={`${props.match.url}/:restaurantId`} render={routerProps => <Restaurant {...routerProps}/>}/>
                <Route path={`${props.match.url}`} render={() => <h1>RestaurantContainer</h1>}/>
            </Switch>
            
        </div>
    )
}

export default RestaurantContainer;