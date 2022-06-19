import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const auth = useContext(AuthContext);
    return (
        <Navbar
            variant='dark'
            expand="lg"
            fixed='top'
            className='bg-primary shadow'
        >
            <Container>
                <Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {auth.isLoggedIn && auth.userType === 'immigration-firm' && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/add-new-job">Add New Job</Nav.Link>
                                <Nav.Link as={Link} to="/view-my-job-postings">My Job Postings</Nav.Link>
                            </React.Fragment>
                        )}
                        {auth.isLoggedIn && auth.userType !== 'immigration-firm' && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/search-jobs">Search Jobs</Nav.Link>
                            </React.Fragment>
                        )}
                        {auth.isLoggedIn && auth.userType === 'applicant' && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
                            </React.Fragment>
                        )}
                    </Nav>
                    <Nav>
                        {!auth.isLoggedIn && (<Button as={Link} to="/auth" variant="outline-light">Login</Button>)}
                        {auth.isLoggedIn && (<Button variant="outline-light"
                            onClick={auth.logout}>Logout</Button>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;