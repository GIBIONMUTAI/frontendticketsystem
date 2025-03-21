import React, { useState, useCallback } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm) {
        navigate(`/?search=${trimmedSearchTerm}`);
      } else {
        navigate('/');
      }
    },
    [searchTerm, navigate]
  );

  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand>Ticket Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add-ticket">
              Add Ticket
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search Ticket..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;