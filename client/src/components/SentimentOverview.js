import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
  ChatDots,
  PatchExclamation,
  ChatHeart,
  EmojiNeutral,
  ArrowUpShort,
} from 'react-bootstrap-icons';

import graph from '../images/picture_graphs.png';

export default function SentimentOverview() {
  return (
    <Container className='dashboard-body-container'>
      <Row>
        <h2 className='dashboard-heading'>Sentiment Overview</h2>
      </Row>
      <Row>
        <Col xs={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-purple d-flex align-items-center justify-content-center'>
                <ChatDots className='card-icon-purple' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Total Comments</h6>
                <Card.Text className='card-number'>12,324</Card.Text>
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
                <ChatHeart className='card-icon-green' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Positive Comments</h6>
                <Card.Text className='card-number'>74%</Card.Text>
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
              <div className='icon-container icon-container-red d-flex align-items-center justify-content-center'>
                <PatchExclamation className='card-icon-red' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Negative Comments</h6>
                <Card.Text className='card-number'>6%</Card.Text>
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
                <EmojiNeutral className='card-icon-orange' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Neutral Comments</h6>
                <Card.Text className='card-number'>20%</Card.Text>
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
