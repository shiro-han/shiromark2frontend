import React from 'react'
import {Route, Redirect, NavLink, Switch} from 'react-router-dom'
import ProfileReviews from './ProfileReviews'
import ProfileForm from './ProfileForm'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'


class ProfileContainer extends React.Component {
    
    render(){
        let user = this.props.user
        return (
            <>
                {localStorage.getItem("token") ?
                    user ?
                    <>
                        <nav className="profile-menu">
                            
                                {/* <NavLink to={`${this.props.match.url}`}>About</NavLink>
                                <NavLink to={`${this.props.match.url}/reviews`}>Reviews</NavLink>
                                <NavLink to={`${this.props.match.url}/following`}>Following</NavLink>
                                <NavLink to={`${this.props.match.url}/followers`}>Followers</NavLink>
                                <NavLink to={`/users/${user.id}`}>View Public Profile Page</NavLink>  */}
                                <a href={`${this.props.match.url}`}>About</a>
                                <a href={`${this.props.match.url}/reviews`}>Reviews</a>
                                <a href={`${this.props.match.url}/following`}>Following</a>
                                <a href={`${this.props.match.url}/followers`}>Followers</a>
                                <a href={`/users/${user.id}`}>View Public Page</a>
                            <div className="animation start-home">
                            </div>
                            
                            
                        </nav>
                        <Switch>
                            <Route path={`${this.props.match.url}/reviews`} render={()=> <ProfileReviews user={this.props.user}/>}/>
                            <Route path={`${this.props.match.url}/following`} render={()=> <FollowingList user={this.props.user}/>} />
                            <Route path={`${this.props.match.url}/followers`} render={()=> <FollowersList user={this.props.user}/>} />
                            <Route path={`${this.props.match.url}`} render={() => <ProfileForm user={this.props.user}/>} />
                        </Switch>
                    </>
                    :
                    <h1>LOADING...</h1>
                :
                    <Redirect to="/login" /> //bug with refreshing and App state here
                }
            </>
        
        )
    }
}

export default ProfileContainer;