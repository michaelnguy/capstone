import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import logo from '../images/logo.png';
import name from '../images/name.png';
import holder from '../images/holder_image.avif';

export default function Home() {
  return (
    <Container
      style={{ backgroundColor: '#f3f2ff' }}
      className='home-container'
    >
      <Row className='home-top'>
        <Col className='d-flex justify-content-between' xs={12}>
          <div>
            <img className='home-logo' src={logo} />
            <img className='home-name' src={name} />
          </div>
          <Button variant='primary'>Open App</Button>
        </Col>
      </Row>
      <Row className='hero-row'>
        <Col className='hero-heading ' xs={6}>
          <h1>
            Leveraging AI Machine Learning to{' '}
            <span className='hero-text-blue'>make the most</span> of your social
            media marketing
          </h1>
          <p className='hero-subheading'>
            VibeMetrics provides analysis of your posts so you always have the
            most accurate feedback.
          </p>
          <p className='subheading'></p>
          <Button variant='primary'>Open App</Button>
        </Col>
        <Col xs={6}>
          <img className='hero-image' src={holder} />
        </Col>
      </Row>
    </Container>
  );
}
