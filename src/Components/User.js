import React from 'react'
import Review from './Review'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import {Button, Container, Row, Col, Image, Card, Nav, CardGroup} from 'react-bootstrap'
const token = localStorage.getItem("token")
let followBool

class User extends React.Component{

    state = {
        user: null,
        showFollowing: false,
        showFollowers: false
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

    showFollowers = () => {
        this.setState({showFollowers: true})
    }

    showFollowing = () => {
        this.setState({showFollowing: true})
    }

    closeModals = () => {
        this.setState({
            showFollowers: false,
            showFollowing: false
        })
    }


    render() {
        if (token) {
            if (this.props.current_user && this.state.user) {
                let follow_ids = this.props.current_user.following.map(user => user.user_id)
                followBool = follow_ids.includes(this.state.user.id)
            }
        }
        console.log("the user", this.state.user) 
        console.log("current user", this.props.current_user)
        
        return (
            <>
                {this.state.user ?
                    <Container>

                        <div>
                            <h1>{this.state.user.name} 
                            {this.props.current_user ?
                                this.state.user.id === this.props.current_user.id ? 
                                    // <Button onClick={this.redirect} variant="primary" id="edit-profile">Edit Profile</Button>
                                    <NavLink to="/profile">Edit Profile </NavLink>
                                :
                                    <button onClick={this.buttonHandler}>{followBool ? "UnFollow" : "Follow"}</button>
                            : 
                                null
                            }</h1>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Image src={this.state.user.image} alt='chicken' roundedCircle />
                                </Col>
                            </Row>
                            <p>{this.state.user.bio}</p>
                            <CardGroup>
                                <Card style={{ width: '6rem'}} className="text-center">
                                    <Card.Body onClick={this.showFollowing}>
                                        <h3><Card.Title>Following</Card.Title>
                                            {this.state.user.following.length}
                                        </h3>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '10rem'}} className="text-center">
                                    <Card.Body onClick={this.showFollowers}>
                                        <h3>
                                            <Card.Title>Followers</Card.Title>
                                            {this.state.user.followers.length}
                                        </h3>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                            <h3>Has {this.state.user.reviews.length} reviews</h3>
                            {this.state.user.reviews.map(review => <Review key={review.id} review={review} current_user={this.props.current_user} /> )}
                        </div>
                        <FollowingList user={this.state.user} show={this.state.showFollowing} closeModals={this.closeModals}/>
                        <FollowersList user={this.state.user} show={this.state.showFollowers} closeModals={this.closeModals}/>
                    </Container>
                    :
                    <h1>LOADING...</h1>
                }
            </>
        )
    }
}

export default User;