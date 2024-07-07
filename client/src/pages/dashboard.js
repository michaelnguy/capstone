import React, { useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import DashboardNav from '../components/DashboardNav';
import Overview from '../components/Overview';

export default function Dashboard() {
  const [show, setShow] = useState('overview');

  return (
    <>
      <Container fluid>
        <Row className='px-0'>
          <Col className='sidebar-container' xs={2}>
            <Sidebar />
          </Col>
          <Col className='px-0' xs={10}>
            <DashboardNav title={'Dashboard'} />
            <Overview />
          </Col>
        </Row>
      </Container>
    </>
  );
}
