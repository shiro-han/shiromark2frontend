import React from 'react'
import Review from './Review'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'
import {Switch, Route, NavLink} from 'react-router-dom'
const token = localStorage.getItem("token")
let followBool

class User extends React.Component{

    state = {
        user: null
    }

    fetchUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(data => this.setState({user: data.user}, () => this.props.refreshCurrentUser()))
    }

    followFn = (user_id) => {
        fetch(`http://localhost:3000/relationships/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({relationship: {followed_id: user_id}})
        })
        .then(resp => resp.json())
        .then(data => {
            this.fetchUser(this.props.match.params.userId)
        })
    }

    unfollowFn = (id) => {
        fetch(`http://localhost:3000/relationships/${id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(resp => resp.json())
        .then(data => {
            this.fetchUser(this.props.match.params.userId)
        })
    }

    buttonHandler = () => {
        if (followBool) {
            this.unfollowFn(this.props.current_user.following.find(user => user.user_id === this.state.user.id).relationship_id)
        } else {
            this.followFn(this.state.user.id)
        }
    }

    componentDidMount(){
        this.fetchUser(this.props.match.params.userId)
    }

    render() {
        if (token) {
            if (this.props.current_user && this.state.user) {
                let follow_ids = this.props.current_user.following.map(user => user.user_id)
                followBool = follow_ids.includes(this.state.user.id)
            }
        }
        
        return (
            <>
                {this.state.user ?
                    <div>
                        <h1>{this.state.user.name} {this.props.current_user ?
                        <button onClick={this.buttonHandler}>{followBool ? "UnFollow" : "Follow"}</button>
                        : 'NOT LOGGED IN'}</h1>
                        <img src={this.state.user.image} alt='chicken' />
                        <p>{this.state.user.bio}</p>
                        <h3><NavLink to={`${this.props.match.url}/following`} >Following: {this.state.user.following.length}</NavLink></h3>
                        <h3><NavLink to={`${this.props.match.url}/followers`} >Followers: {this.state.user.followers.length}</NavLink></h3>
                        <h3>Has {this.state.user.reviews.length} reviews</h3>
                        {this.state.user.reviews.map(review => <Review key={review.id} review={review} current_user={this.props.current_user} /> )}
                    </div>
                    :
                    <h1>LOADING...</h1>
                }
                <Switch>
                    <Route path={`${this.props.match.url}/following`} render={()=> <FollowingList user={this.state.user}/>} />
                    <Route path={`${this.props.match.url}/followers`} render={()=> <FollowersList user={this.state.user}/>} />
                </Switch>
            </>
        )
    }
}

export default User;