import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
  Person,
  PersonAdd,
  ChatHeart,
  Mouse,
  ArrowUpShort,
} from 'react-bootstrap-icons';

import graph from '../images/picture_graphs.png';

export default function Overview() {
  return (
    <Container className='dashboard-body-container'>
      <Row>
        <h2 className='dashboard-heading'>Dashboard</h2>
      </Row>
      <Row>
        <Col xs={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-purple d-flex align-items-center justify-content-center'>
                <Person className='card-icon-purple' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Followers</h6>
                <Card.Text className='card-number'>5738</Card.Text>
                <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                  <ArrowUpShort className='card-bottom-arrow-green' size={20} />
                  <div className='card-bottom-percent'>+2.31%</div>
                  <div className='card-bottom-text ms-1'>(30 days)</div>
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-green d-flex align-items-center justify-content-center'>
                <PersonAdd className='card-icon-green' size={28} />
              </div>
              <div>
                <h6 className='card-title'>New Followers</h6>
                <Card.Text className='card-number'>12</Card.Text>
                <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                  <ArrowUpShort className='card-bottom-arrow-green' size={20} />
                  <div className='card-bottom-percent'>+2.31%</div>
                  <div className='card-bottom-text ms-1'>(30 days)</div>
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                <ChatHeart className='card-icon-blue' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Engagement</h6>
                <Card.Text className='card-number'>5738</Card.Text>
                <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                  <ArrowUpShort className='card-bottom-arrow-green' size={20} />
                  <div className='card-bottom-percent'>+2.31%</div>
                  <div className='card-bottom-text ms-1'>(30 days)</div>
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-orange d-flex align-items-center justify-content-center'>
                <Mouse className='card-icon-orange' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Clickthrough Rate</h6>
                <Card.Text className='card-number'>5738</Card.Text>
                <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                  <ArrowUpShort className='card-bottom-arrow-green' size={20} />
                  <div className='card-bottom-percent'>+2.31%</div>
                  <div className='card-bottom-text ms-1'>(30 days)</div>
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <img
          className='graph'
          style={{ marginTop: '20px', width: '1200px' }}
          src={graph}
          alt='app logo'
        />
      </Row>
    </Container>
  );
}
