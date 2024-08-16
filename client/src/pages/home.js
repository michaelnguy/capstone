import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { TypeAnimation } from 'react-type-animation';
import Lottie from 'react-lottie';
import animationData from '../lotties/hero.json';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';
import name from '../images/name.png';
import botleft from '../images/botleft.png';
import botright from '../images/botright.png';
import dashboard from '../images/Dashboard.png';
import sentimentList from '../images/SentimentList.png';
import hashtag from '../images/Hashtag.png';
import aws from '../images/aws.svg';
import jupyter from '../images/jupyter.webp';
import mongo from '../images/mongo.svg';
import pytorch from '../images/pytorch.png';
import scikit from '../images/scikit.png';
import { Check } from 'react-bootstrap-icons';

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Container className='home-container'>
        <Row className='home-top'>
          <Col className='d-flex justify-content-between' xs={12}>
            <div>
              <img className='home-logo' src={logo} />
              <img className='home-name' src={name} />
            </div>
            <a className='primary-button' href='/app'>
              Open VibeMetrics
            </a>
          </Col>
        </Row>
        <Row className='hero-row'>
          <Col className='hero-heading-col' xs={{ span: 12, order: 2 }} md={6}>
            <h1 className='hero-heading'>
              Leveraging AI Machine Learning to{' '}
              <span className='hero-text-blue'>make the most</span> of your
              social media marketing
            </h1>
            <p className='hero-subheading'>
              VibeMetrics provides analysis of your posts so you always have the
              most accurate feedback.
            </p>
            <p className='subheading'></p>
            <a className='primary-button' href='/app'>
              Open VibeMetrics
            </a>
          </Col>
          <Col
            className='d-flex justify-content-center pt-5'
            xs={{ span: 12, order: 1 }}
            md={6}
          >
            <div>
              <Lottie options={defaultOptions} height={475} width={475} />
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Row className='section-spacer'></Row> */}
      <Container className='typing-animation-wrapper'>
        <h2 className='title-typing-animation'>
          Vibemetrics helps you cut through the noise. Get a pulse on your{' '}
          <span className='content-animation'>
            <TypeAnimation
              preRenderFirstString={true}
              sequence={[
                500,
                'Photos', // initially rendered starting point
                1000,
                'Videos',
                1000,
                'Advertisements',
                // 1000,
                // 'Chinchillas',
                500,
              ]}
              speed={50}
              style={{
                fontSize: '2.3753rem',
                fontFamily: 'Rany',
                color: '#4b3cff',
              }}
              repeat={Infinity}
            />
          </span>
        </h2>
      </Container>
      <Row className='spacer-row-48'></Row>
      <Container>
        <Container className='container-features-top'>
          <Row className='feature-card'>
            <Col className='feature-card-wrapper d-flex flex-column' xs={5}>
              <div className='pill pill-blue'>Overview</div>
              <h3 className='feature-subheading-32'>
                Track vital stats about your account
              </h3>
              <p className='feature-card-text'>
                View trends over time and pinpoint your best received posts
              </p>
              <div className='d-flex flex-column list'>
                <div className='list-wrapper d-flex'>
                  <Check size={22} color={'#4b3cff'} className='checkmark' />
                  <p className='list-text'>Sentiment analysis</p>
                </div>
                <div className='list-wrapper d-flex'>
                  <Check size={22} color={'#4b3cff'} className='checkmark' />
                  <p className='list-text'>Hashtag recommendations</p>
                </div>
                <div className='list-wrapper d-flex'>
                  <Check size={22} color={'#4b3cff'} className='checkmark' />
                  <p className='list-text'>Follower tracking</p>
                </div>
              </div>
            </Col>
            <Col xs={7} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <div className='feature-image-wrapper'>
                <img className='feature-image-top' src={dashboard} />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className='container-outerwrapper-bottom'>
        <Container className='container-wrapper-bottom'>
          <Row>
            <Col className='feature-card-botleft-wrapper' xs={8}>
              <div className='left-wrapper'>
                <div className='pill pill-green'>Sentiment</div>
                <h3 className='feature-subheading-40'>
                  Quickly see how your posts are received
                </h3>
                <p className='feature-card-text'>
                  In one click, see the sentiment of posts that you've made.
                </p>
                <div className='image-wrapper-botleft'>
                  <img src={sentimentList} className='feature-image-botleft' />
                </div>
              </div>
            </Col>

            <Col className='feature-card-botright-wrapper' xs={4}>
              <div className='right-wrapper'>
                <div className='pill pill-yellow'>Hashtags</div>
                <h3 className='feature-subheading-40'>Find Hashtags</h3>
                <p className='feature-card-text'>
                  Use image recognication to find hashtags.
                </p>
                <div className='image-wrapper-botright d-flex '>
                  <img
                    src={hashtag}
                    className='feature-image-botright mx-auto'
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container
        fluid
        style={{ backgroundColor: '#fff', paddingBottom: '12.5rem' }}
      >
        <Container>
          <Row classNames='tech-section'>
            <Col className='d-flex' xs={4}>
              <div className='align-self-center'>
                <h3 className='feature-subheading-32'>
                  We're building with some of the latest tools and techniques in
                  data science
                </h3>
              </div>
            </Col>
            <Col className='logo-col' xs={8}>
              {/* <div className='logo-container d-flex flex-col'> */}
              <Row className='d-flex justify-content-around mb-4'>
                <img src={aws} className='tech-logos-aws' />
                <img src={pytorch} className='tech-logos-pytorch' />
                <img src={scikit} className='tech-logos-sklearn' />
              </Row>
              <Row className='d-flex justify-content-around'>
                <img src={jupyter} className='tech-logos-jupyter' />

                <img src={mongo} className='tech-logos-mongo' />
              </Row>
              {/* </div> */}
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className='faq-outer-wrapper'>
        <Container className='faq-container'>
          <Row>
            <Col xs={3}>
              <h1>FAQ</h1>
            </Col>
            <Col xs={9}>
              <div>
                <Accordion>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header className='faq-header'>
                      What does VibeMetrics do with my data?
                    </Accordion.Header>
                    <Accordion.Body>
                      Please visit our data{' '}
                      <Link to='/privacy'>privacy page</Link> page for more
                      information about how we use your data.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey='1'>
                    <Accordion.Header className='faq-header'>
                      How do I get access to VibeMetrics?
                    </Accordion.Header>
                    <Accordion.Body>
                      VibeMetrics is currently in demo mode and is not publicly
                      available.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey='2'>
                    <Accordion.Header className='faq-header'>
                      Who are the creators of VibeMetrics?
                    </Accordion.Header>
                    <Accordion.Body>
                      VibeMetrics was created by Team 24 for our MADS capstone
                      project.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className='actioncall-outerwrapper'>
        <Container className='d-flex flex-column'>
          <Row className='d-flex flex-column align-items-center'>
            <img className='actioncall-logo' src={logo} />
            <h2 className='actioncall-text text-center'>
              Get started with VibeMetrics
            </h2>
          </Row>
          <Button
            href='/app'
            className='align-self-center'
            style={{ maxWidth: '160px', borderRadius: '2.5rem' }}
          >
            {' '}
            Open VibeMetrics
          </Button>

          <Row></Row>
        </Container>
      </Container>
      <Container fluid className='footer-outerwrapper'>
        <Container className='footer-innerwrapper'>
          <Row className='d-flex align-items-start'>
            <Col className='me-auto footer-leftcol' xs={4}>
              <img className='footer-logo' src={logo} />
              <img className='footer-name' src={name} />
              <p className='footer-text'>
                Get a pulse on your social media marketing
              </p>
            </Col>
            <Col className='d-flex flex-column' xs={3}>
              <p className='footer-title'>Website</p>
              <Link className='footer-bottom-link' to='/app'>
                Log in
              </Link>
            </Col>
            <Col className='d-flex flex-column' xs={3}>
              <p className='footer-title'>Legal</p>
              <Link className='footer-bottom-link' to='/privacy'>
                Data Privacy
              </Link>
            </Col>
          </Row>
          <Row className='footer-copyright'>
            <Col className='text-center' xs={12}>
              <div>A West Coast Data Fiends project</div>
              <div>&copy; {new Date().getFullYear()}</div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
