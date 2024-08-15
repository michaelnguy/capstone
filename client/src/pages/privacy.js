import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <Container style={{ paddingBottom: '10rem' }} className='home-container'>
      <Row className='home-top'>
        <Col className='d-flex justify-content-between' xs={12}>
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img className='home-logo' src={logo} />
            <img className='home-name' src={name} />
          </div>
          <a className='primary-button'>Open VibeMetrics</a>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <h2 style={{ fontWeight: '700', paddingTop: '6rem' }}>
            Data Privacy
          </h2>
        </Col>
        <Col xs={8} className='d-flex flex-column privacy'>
          <h3>Your Privacy Matters</h3>
          <p>
            At VibeMetrics, we are committed to protecting your privacy and
            ensuring the responsible use of your data. This statement explains
            how we handle and protect the information you provide when using our
            social media dashboard for marketing purposes.
          </p>
          <h5 className='mt-2'>Data We Collect</h5>
          <p>
            <strong>&#x2022; Posts and Comments:</strong> We store the posts and
            comments you choose to analyze through our platform. This data helps
            us provide insights and analytics to improve your social media
            marketing strategies.
          </p>
          <p>
            <strong>&#x2022; Non-Personal Data:</strong> We collect and store
            non-personal data that cannot be used to identify you, such as
            aggregated statistics and trends.
          </p>
          <h5 className='mt-2'>What We Don’t Collect</h5>
          <p>
            <strong>&#x2022; Personal Information:</strong> We do not collect or
            store any personal information such as names, addresses, phone
            number, or other identifying details.
          </p>
          <h5 className='mt-2'>How We Use Your Data</h5>
          <p>
            <strong>&#x2022; Analytics and Insights:</strong> The data collected
            is used solely to provide you with meaningful analytics and insights
            into your social media performance. This helps you understand
            trends, engagement, and the effectiveness of your marketing
            campaigns.
          </p>
          <p>
            <strong>&#x2022; Data Protection:</strong> We take appropriate
            security measures to protect your data from unauthorized access,
            disclosure, alteration, or destruction.
          </p>
          <h5 className='mt-2'>What We Don’t Do with Your Data</h5>
          <p>
            <strong>&#x2022; No Data Selling:</strong> We do not sell or share
            your data with third parties for marketing or any other purposes.
          </p>
          <p>
            <strong>&#x2022; No Unnecessary Sharing: </strong> Your data is not
            shared with anyone unless required by law or necessary to protect
            our rights.
          </p>
          <h5 className='mt-2'>Your Control Over Your Data</h5>
          <p>
            <strong>&#x2022; Data Access and Deletion: </strong> You have the
            right to access and request the deletion of your data stored on our
            platform. We respect your privacy and will comply with any such
            requests.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
