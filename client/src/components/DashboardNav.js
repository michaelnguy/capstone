import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function DashboardNav({ title }) {
  return (
    <Navbar expand='lg' className='dashboardnav'>
      <Container className='d-flex justify-content-end'>
        {/* <Navbar.Brand href='#home'>{title}</Navbar.Brand> */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <div className='px-4'>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link className='navbar-text align-self-center' href='#home'>
                Home
              </Nav.Link>
              <Nav.Link className='navbar-text align-self-center' href='#link'>
                Link
              </Nav.Link>
              <NavDropdown
                className='navbar-text'
                title='Dropdown'
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
