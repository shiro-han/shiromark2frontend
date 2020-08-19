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
                                
                    </>
                    :
                    <div class="spinner">
                        <Spinner animation="border" variant="info" />
                    </div>

                :
                    <Redirect to="/login" /> //bug with refreshing and App state here
                }
            </>
        
        )
    }
}

export default ProfileContainer;