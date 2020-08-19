import React from 'react'
import {Route, Redirect, NavLink, Switch} from 'react-router-dom'
import { Nav, Navbar, Container, Grid, Row, Col, Spinner } from 'react-bootstrap'


class ProfileContainer extends React.Component {
    
    render(){
        let user = this.props.user
        return (
            <>
                {localStorage.getItem("token") ?
                    user ?
                    <>
                        {/* <nav className="profile-menu">
                                <a href={`${this.props.match.url}`}>About</a>
                                <a href={`${this.props.match.url}/reviews`}>Reviews</a>
                                <a href={`${this.props.match.url}/following`}>Following</a>
                                <a href={`${this.props.match.url}/followers`}>Followers</a>
                                <a href={`/users/${user.id}`}>View Public Page</a>
                                <div className="animation start-home">
                                </div>
                            </nav> */}
                            
                            <Navbar bg='light' variant="light" >
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                                <Container>
                                    <Nav className="profile">
                                        <Nav.Link href={`${this.props.match.url}`}>About</Nav.Link>
                                        <Nav.Link href={`${this.props.match.url}/reviews`}>Reviews</Nav.Link>
                                        <Nav.Link href={`${this.props.match.url}/following`}>Following</Nav.Link>
                                        <Nav.Link href={`${this.props.match.url}/followers`}>Followers</Nav.Link>
                                        <Nav.Link href={`/users/${user.id}`}>View Public Page</Nav.Link>
                                    </Nav>
                                </Container>
                            </Navbar>
                                         {/* <NavLink to={`${this.props.match.url}`}>About</NavLink>
                                        <NavLink to={`${this.props.match.url}/reviews`}>Reviews</NavLink>
                                        <NavLink to={`${this.props.match.url}/following`}>Following</NavLink>
                                        <NavLink to={`${this.props.match.url}/followers`}>Followers</NavLink>
                                        <NavLink to={`/users/${user.id}`}>View Public Profile Page</NavLink>  */}
                                
                    </>
                    :
                    <Spinner animation="border" variant="info" />

                :
                    <Redirect to="/login" /> //bug with refreshing and App state here
                }
            </>
        
        )
    }
}

export default ProfileContainer;