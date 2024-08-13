import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

import { AuthContext } from '../context/auth';

export default function TopNavbar({ userData }) {
  const { logout } = useContext(AuthContext);

  return (
    <Navbar expand='lg' className='dashboardnav'>
      <Container className='d-flex justify-content-end'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <div className='px-4'>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto d-flex'>
              <Dropdown className='py-2 align-self-center justify-self-center'>
                <Dropdown.Toggle
                  variant='dark'
                  className='d-flex align-items-center text-white text-decoration-none'
                  id='dropdownUser1'
                >
                  <img
                    src={userData.igPhoto}
                    alt=''
                    width='32'
                    height='32'
                    className='rounded-circle me-2'
                  />
                  <strong>{userData.igHandle}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className='dropdown-menu-dark text-small shadow'
                  aria-labelledby='dropdownUser1'
                >
                  <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
