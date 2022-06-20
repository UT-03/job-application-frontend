import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const auth = useContext(AuthContext);

    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar
            variant='dark'
            expand="lg"
            fixed='top'
            className='bg-primary shadow gradient'
            expanded={expanded}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>
                <Navbar.Toggle
                    style={{
                        boxShadow: "none",
                        border: "none"
                    }}
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}>
                    <button class={`hamburger hamburger--twist ${expanded ? 'active' : ''}`} type="button">
                        <div class="inner">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </button>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="mx-auto"
                        onClick={() => setExpanded(false)}>
                        <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
                        {auth.isLoggedIn && auth.userType === 'immigration-firm' && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/add-new-job" className="mx-2">Add New Job</Nav.Link>
                                <Nav.Link as={Link} to="/view-my-job-postings" className="mx-2">My Job Postings</Nav.Link>
                            </React.Fragment>
                        )}
                        {auth.isLoggedIn && auth.userType !== 'immigration-firm' && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/search-jobs" className="mx-2">Search Jobs</Nav.Link>
                            </React.Fragment>
                        )}
                        {auth.isLoggedIn && auth.userType === 'applicant' && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/my-profile" className="mx-2">My Profile</Nav.Link>
                            </React.Fragment>
                        )}
                    </Nav>
                    <Nav>
                        {!auth.isLoggedIn && (
                            <Button
                                as={Link}
                                to="/auth"
                                variant="outline-light my-2">Login</Button>)}
                        {auth.isLoggedIn && (
                            <Button
                                variant="outline-light my-2"
                                onClick={auth.logout}>Logout</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;