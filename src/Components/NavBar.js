import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const NavBar = (props) => {
    return (
    <Navbar bg='light' fixed="top">
        <Navbar.Brand href="/">ShiroMark 2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/restaurants">Restaurants</Nav.Link>
            {props.user ?
                <>
                    <Nav.Link href={`/users/${props.user.id}`}> My Profile </Nav.Link>
                    {/* <NavLink to={`/users/${props.user.id}`}>My Profile</NavLink> */}
                    <Nav.Item> <Nav.Link onClick={props.logoutHandler}> Log Out </Nav.Link>  </Nav.Item>
                </>
            :
                <Nav.Link href="/login"> Log In </Nav.Link>
            }
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default NavBar;