import React from 'react'
import { Route, Switch } from 'react-router-dom'
import User from './User'

const UserContainer = (props) => {
    return (
        <div>
            <Switch>
                <Route path={`${props.match.url}/:userId`} render={routerProps => <User {...routerProps} current_user={props.current_user} refreshCurrentUser={props.refreshCurrentUser} />}/>
                <Route path={`${props.match.url}`} render={() => <h1>UserContainer</h1>}/>
            </Switch>
        </div>
    )
}

export default UserContainer;