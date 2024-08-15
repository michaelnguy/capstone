import React, { useState, useContext } from 'react';
import { Outlet, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Collapse,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';
import {
  FileEarmarkBarGraph,
  BarChartSteps,
  Hash,
} from 'react-bootstrap-icons';
import axios from 'axios';

import { AuthContext } from '../context/auth';
import dummyData from '../dummyData/user.json';
import name from '../images/name.png';
import logo from '../images/logo.png';

import TopNavbar from '../components/TopNavbar';
import Overview from '../components/Overview';
import SentimentOverview from '../components/SentimentOverview';
import SinglePostAnalysis from '../components/SinglePostAnalysis';
import AllPostAnalysis from '../components/AllPostAnalysis';
import Hashtag from '../components/Hashtag';

export default function Dashboard() {
  const { user, state, dispatch } = useContext(AuthContext);
  let userData;
  if (user.email === 'tide@email.com') {
    userData = dummyData.tide;
  } else {
    userData = dummyData['12pell'];
  }

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Container fluid>
        <Row className='px-0'>
          {/* -----------------START SIDEBAR--------------- */}
          <Col className='sidebar-container' xs={2}>
            <Container className='sidebar-inner-container d-flex flex-column'>
              <Navbar className='d-flex align-items-center mt-4'>
                <Navbar.Brand
                  href='/'
                  className='d-flex align-items-center'
                  id='logo'
                >
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
                  <Nav.Link
                    className='sidebar-link'
                    onClick={() => handleNavigation('/app/dashboard')}
                  >
                    Dashboard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='d-flex'>
                  <div className='sidebar-icon-container justify-content-center d-flex'>
                    <BarChartSteps
                      className='align-self-center sidebar-icon'
                      size={16}
                    />
                  </div>

                  <Nav.Link
                    className='sidebar-link'
                    onClick={() => setOpen(!open)}
                  >
                    Sentiment Analysis
                  </Nav.Link>
                </Nav.Item>
                <Collapse className='sidebar-collapse' in={open}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item
                      action
                      className='sidebar-item'
                      onClick={() =>
                        handleNavigation('/app/sentiment-overview')
                      }
                    >
                      Overview
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      onClick={() => handleNavigation('/app/posts')}
                      className='sidebar-item'
                    >
                      Post Analysis
                    </ListGroup.Item>
                  </ListGroup>
                </Collapse>
                <Nav.Item className='d-flex'>
                  <div className='sidebar-icon-container justify-content-center d-flex'>
                    <Hash className='align-self-center ' size={24} />
                  </div>
                  <Nav.Link
                    className='sidebar-link'
                    onClick={() => handleNavigation('/app/hashtag')}
                  >
                    Hashtag Recommendation
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Col>
          {/* -----------------END SIDEBAR--------------- */}
          <Col className='px-0 dashboard-content' xs={10}>
            <TopNavbar userData={userData} />
            <Routes>
              <Route path='/dashboard' element={<Overview />} />
              <Route
                path='/sentiment-overview'
                element={<SentimentOverview userData={userData} />}
              />
              <Route
                path='/posts'
                element={<AllPostAnalysis userData={userData} />}
              />
              <Route
                path='/posts/:postId'
                element={<SinglePostAnalysis userData={userData} />}
              />
              <Route path='/hashtag' element={<Hashtag />} />
              {/* Default route */}
              <Route path='' element={<Navigate to='dashboard' />} />
            </Routes>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
