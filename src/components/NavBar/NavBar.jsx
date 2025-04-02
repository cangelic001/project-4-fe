import { useContext, useState } from "react";
import { Link } from "react-router";
import cupLogo from '../../assets/coffee-cup.png';
import './NavBar.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [ show, setShow ] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  return (
    <>
      <Navbar sticky="top" expand={false} className=" mb-5 custom-navbar" >
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={cupLogo}
                width="40"
                height="40"
                className="d-inline-block align-top"
              />{' '}
              <span className="fw-bold">
                <span className="cobalt">CodeBrew.io</span> 
                <span style={{color: "gray"}}> Tutor Platform</span>
              </span>
            </Navbar.Brand>

            <Nav className="justify-content-end flex-grow-1 pe-3 flex-row fw-bold">
                {user ? (
                    <>
                      <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
                      <Nav.Link as={Link} to="/entries" onClick={handleLinkClick}>Entries</Nav.Link>
                      <Nav.Link as={Link} to="/entries/new" onClick={handleLinkClick}>New Entry</Nav.Link>
                      <Nav.Link as={Link} to="/" onClick={() => { handleLinkClick(); handleSignOut(); }}>
                        Sign Out
                      </Nav.Link>
                    </>
                ) : (
                  <>
                      <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
                      <Nav.Link as={Link} to="/sign-in" onClick={handleLinkClick}>Sign In</Nav.Link>
                      <Nav.Link as={Link} to="/sign-up" onClick={handleLinkClick}>Sign Up</Nav.Link>
                  </>
                )}
                </Nav>
            
            <Navbar.Toggle aria-controls="offcanvasNavbar" className="offcanvasToggle" onClick={() => setShow(true)} />
            
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              show={show} 
              onHide={() => setShow(false)}
            >
              <Offcanvas.Header closeButton>

                <Offcanvas.Title id="offcanvasNavbarLabel">
                  <span className="fw-bold">
                    <span className="cobalt">CodeBrew.io</span>
                  </span>
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 fw-bold">
                {user ? (
                    <>
                      <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
                      <Nav.Link as={Link} to="/logs" onClick={handleLinkClick}>Entries</Nav.Link>
                      <Nav.Link as={Link} to="/logs/new" onClick={handleLinkClick}>New Entry</Nav.Link>
                      <Nav.Link as={Link} to="/" onClick={() => { handleLinkClick(); handleSignOut(); }}>
                        Sign Out
                      </Nav.Link>
                    </>
                ) : (
                  <>
                      <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
                      <Nav.Link as={Link} to="/sign-in" onClick={handleLinkClick}>Sign In</Nav.Link>
                      <Nav.Link as={Link} to="/sign-up" onClick={handleLinkClick}>Sign Up</Nav.Link>
                  </>
                )}
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>        
  );
};

export default NavBar;
