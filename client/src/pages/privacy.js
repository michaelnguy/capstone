import React from 'react';

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

import name from '../images/name.png';
import logo from '../images/logo.png';

export default function Privacy() {
  return (
    <Container className='home-container'>
      <Row className='home-top'>
        <Col className='d-flex justify-content-between' xs={12}>
          <div>
            <img className='home-logo' src={logo} />
            <img className='home-name' src={name} />
          </div>
          <a className='primary-button'>Open VibeMetrics</a>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h2>Data Privacy</h2>
        </Col>
        <Col xs={6} className='d-flex flex-column privacy'>
          <h3>Your Privacy Matters</h3>
          <p>
            At VibeMetrics, we are committed to protecting your privacy and
            ensuring the responsible use of your data. This statement explains
            how we handle and protect the information you provide when using our
            social media dashboard for marketing purposes.
          </p>
          <h4>Data We Collect</h4>
          <p>
            <strong>Posts and Comments:</strong> We store the posts and comments
            you choose to analyze through our platform. This data helps us
            provide insights and analytics to improve your social media
            marketing strategies.
          </p>
          <p>
            <strong>Non-Personal Data:</strong> We collect and store
            non-personal data that cannot be used to identify you, such as
            aggregated statistics and trends.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
