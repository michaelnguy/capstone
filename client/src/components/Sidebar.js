import React, { useState } from 'react';

import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Collapse,
  ListGroup,
  Col,
} from 'react-bootstrap';
import {
  FileEarmarkBarGraph,
  BarChartSteps,
  Hash,
} from 'react-bootstrap-icons';

import name from '../images/name.png';
import logo from '../images/logo.png';

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Container className='sidebar-inner-container d-flex flex-column'>
      <Navbar className='d-flex align-items-center mt-4'>
        <Navbar.Brand href='/' className='d-flex align-items-center' id='logo'>
          <img className='logo' src={logo} alt='app logo' />
          <img className='name mx-2' src={name} alt='app name' />
        </Navbar.Brand>
      </Navbar>
      <hr />
      <Nav className='nav-pills flex-column mb-auto sidebar-option'>
        <Nav.Item className='d-flex'>
          <div className='sidebar-icon-container justify-content-center d-flex'>
            <FileEarmarkBarGraph
              className='align-self-center  sidebar-icon'
              size={16}
            />
          </div>

          <Nav.Link className='sidebar-link'>Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item className='d-flex'>
          <div className='sidebar-icon-container justify-content-center d-flex'>
            <BarChartSteps
              className='align-self-center sidebar-icon'
              size={16}
            />
          </div>

          <Nav.Link className='sidebar-link' onClick={() => setOpen(!open)}>
            Sentiment Analysis
          </Nav.Link>
        </Nav.Item>
        <Collapse className='sidebar-collapse' in={open}>
          <ListGroup variant='flush'>
            <ListGroup.Item action href='#link1' className='sidebar-item'>
              Overview
            </ListGroup.Item>
            <ListGroup.Item action href='#link2' className='sidebar-item'>
              Post Analysis
            </ListGroup.Item>
          </ListGroup>
        </Collapse>
        <Nav.Item className='d-flex'>
          <div className='sidebar-icon-container justify-content-center d-flex'>
            <Hash className='align-self-center ' size={24} />
          </div>
          <Nav.Link className='sidebar-link'>Hashtag Recommendation</Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
    </Container>
  );
}

export default Sidebar;
