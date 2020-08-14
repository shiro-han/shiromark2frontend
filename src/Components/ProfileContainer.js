import React from 'react'
import {Route, Redirect, NavLink, Switch} from 'react-router-dom'
import ProfileReviews from './ProfileReviews'
import ProfileForm from './ProfileForm'


class ProfileContainer extends React.Component {
    
    render(){
        let user = this.props.user 
        console.log(this.props.match)
        return (
            <>
                {this.props.user ? 
                    <>
                        <div className="links">
                            <NavLink to={`${this.props.match.url}`}>About</NavLink>
                            <NavLink to={`${this.props.match.url}/reviews`}>Reviews</NavLink>
                            {/* <NavLink to={`${this.props.match.url}/following`}>Following</NavLink> */}
                            <NavLink to={`/users/${user.id}`}>View Public Profile Page</NavLink>
                        </div>
                        <Switch>
                            <Route path={`${this.props.match.url}/reviews`} render={()=> <ProfileReviews user={this.props.user}/>}/>
                            <Route path={`${this.props.match.url}`} render={() => <ProfileForm user={this.props.user}/>} />
                            {/* <Route path={`${this.props.match.url}/following`} render={()=> <ProfileFollowing />} />                      */}
                        </Switch>
                    </>
                :
                    <Redirect to="/login" /> //bug with refreshing and App state here
                }
            </>
        
        )
    }
}


export default ProfileContainer;