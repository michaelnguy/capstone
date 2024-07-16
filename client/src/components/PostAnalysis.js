import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostAnalysis() {
  return (
    <Container className='posts-body-container'>
      <Row>
        <h2 className='dashboard-heading'>Post Analysis</h2>
      </Row>
      <div className='posts-table-outercontainer'>
        <div className='posts-table-innercontainer'>
          <Row className='table-row-label'>
            <Col className='table-label' xs={1}>
              Image
            </Col>
            <Col className='table-label' xs={2}>
              Tags
            </Col>
            <Col className='table-label' xs={2}>
              % Positive
            </Col>
            <Col className='table-label' xs={2}>
              % Negative
            </Col>
            <Col className='table-label' xs={2}>
              % Neutral
            </Col>
            <Col className='table-label' xs={2}>
              % Undetermined
            </Col>
            <Col className='table-label' xs={1}>
              Graph
            </Col>
          </Row>
          <Link to={`/app/posts/0`} key={0} style={{ textDecoration: 'none' }}>
            <Row className='table-row-post'>
              <Col className='table-label' xs={1}>
                <img
                  style={{ height: '50px', width: '50px' }}
                  src={
                    'https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                />
              </Col>
              <Col className='table-text' xs={2}>
                paint, design, behr
              </Col>
              <Col className='table-text' xs={2}>
                33
              </Col>
              <Col className='table-text' xs={2}>
                21
              </Col>
              <Col className='table-text' xs={2}>
                4
              </Col>
              <Col className='table-text' xs={2}>
                8
              </Col>
              <Col className='table-text' xs={1}></Col>
            </Row>
          </Link>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://images.unsplash.com/photo-1718068769782-b76cda287298?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              66
            </Col>
            <Col className='table-text' xs={2}>
              12
            </Col>
            <Col className='table-text' xs={2}>
              5
            </Col>
            <Col className='table-text' xs={2}>
              4
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://images.unsplash.com/photo-1720518566980-9d02b27543a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              4
            </Col>
            <Col className='table-text' xs={2}>
              45
            </Col>
            <Col className='table-text' xs={2}>
              1
            </Col>
            <Col className='table-text' xs={2}>
              2
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://images.unsplash.com/photo-1720534490358-bc2ad29d51d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              54
            </Col>
            <Col className='table-text' xs={2}>
              35
            </Col>
            <Col className='table-text' xs={2}>
              7
            </Col>
            <Col className='table-text' xs={2}>
              1
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              74
            </Col>
            <Col className='table-text' xs={2}>
              11
            </Col>
            <Col className='table-text' xs={2}>
              1
            </Col>
            <Col className='table-text' xs={2}>
              2
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://images.unsplash.com/photo-1720409945965-e9797fa27172?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              23
            </Col>
            <Col className='table-text' xs={2}>
              45
            </Col>
            <Col className='table-text' xs={2}>
              4
            </Col>
            <Col className='table-text' xs={2}>
              14
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://plus.unsplash.com/premium_photo-1679064286509-0ba3cac02932?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              82
            </Col>
            <Col className='table-text' xs={2}>
              10
            </Col>
            <Col className='table-text' xs={2}>
              0
            </Col>
            <Col className='table-text' xs={2}>
              6
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://images.unsplash.com/photo-1719530910477-182ceb10b681?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              38
            </Col>
            <Col className='table-text' xs={2}>
              33
            </Col>
            <Col className='table-text' xs={2}>
              7
            </Col>
            <Col className='table-text' xs={2}>
              14
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
          <Row className='table-row-post'>
            <Col className='table-label' xs={1}>
              <img
                style={{ height: '50px', width: '50px' }}
                src={
                  'https://plus.unsplash.com/premium_photo-1676654935649-d68c1ec9d717?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
              />
            </Col>
            <Col className='table-text' xs={2}>
              paint, design, behr
            </Col>
            <Col className='table-text' xs={2}>
              25
            </Col>
            <Col className='table-text' xs={2}>
              31
            </Col>
            <Col className='table-text' xs={2}>
              51
            </Col>
            <Col className='table-text' xs={2}>
              33
            </Col>
            <Col className='table-text' xs={1}></Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
