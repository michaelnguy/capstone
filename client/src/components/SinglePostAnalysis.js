import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Card, Col } from 'react-bootstrap';
import {
  EmojiGrin,
  EmojiAngry,
  EmojiNeutral,
  Question,
} from 'react-bootstrap-icons';
import { InstagramEmbed } from 'react-social-media-embed';

import { formatDate, calcEngagement } from '../util/functions.js';

export default function SinglePostAnalysis({ userData }) {
  const { postId } = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [percentages, setPercentages] = useState({});
  const [show, setShow] = useState(false);

  const calcPercentages = (post) => {
    const commentsCount = post.sentiment.positive + post.sentiment.negative;
    const posPercent =
      commentsCount > 0
        ? Math.round((post.sentiment.positive / commentsCount) * 100)
        : 0;
    const negPercent =
      commentsCount > 0
        ? Math.round((post.sentiment.negative / commentsCount) * 100)
        : 0;
    const neuPercent = Math.round(0.32 * 100); // Example values
    const unkPercent = Math.round(0.17 * 100); // Example values

    return {
      posPercent,
      negPercent,
      neuPercent,
      unkPercent,
    };
  };

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('jwtToken');

      try {
        const response = await axios.get('http://localhost:3001/getpost', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            postId: postId,
          },
        });
        const fetchedPost = response.data;
        setPost(fetchedPost.post[0]);
        console.log(fetchedPost.post[0]);
        console.log('set post ' + post.likes);

        const calculatedPercentages = calcPercentages(fetchedPost.post[0]);
        setPercentages(calculatedPercentages);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  let markup;

  if (loading) {
    markup = (
      <Container
        style={{ minHeight: '45vh', marginTop: '10rem' }}
        className='d-flex justify-content-center align-items-center'
      >
        <div className='lds-dual-ring-singlepiece'></div>
      </Container>
    );
  } else if (error) {
    markup = (
      <Container style={{ minHeight: '45vh', marginTop: '10rem' }}>
        <Col className='d-flex justify-content-center'>
          <Row className>
            <p className='text-center' style={{ fontSize: '2rem' }}>
              This page does not exist or something went wrong.
            </p>
          </Row>
        </Col>
      </Container>
    );
  } else {
    markup = (
      <Container className='post-body-container'>
        <Row>
          <div className='d-flex'>
            <h2 className='dashboard-heading'>Post Analysis - </h2>
          </div>
        </Row>
        <Row className='d-flex'>
          <Col xs={5}>
            <div>
              <InstagramEmbed
                url={`https://www.instagram.com/p/${postId}`}
                fluid
                caption
              />
            </div>
          </Col>

          <Col xs={7}>
            <Row className='pb-4'>
              <Card className='post-card-box'>
                <div className='d-flex flex-column card-wrapper'>
                  <div className='pb-2'>
                    <span className='card-title'>Date Posted:</span>{' '}
                    {formatDate(post.igTimestamp)}
                  </div>
                  <div className='pb-2'>
                    <span className='card-title'>Caption:</span> {post.body}
                  </div>
                  <div className='pb-2'>
                    <span className='card-title'>Tags:</span>{' '}
                    {post.tags.join(', ')}
                  </div>
                  <div className='pb-2'>
                    <span className='card-title'>Comment Count:</span>{' '}
                    {post.comments.length}
                  </div>
                  <div className='pb-2'>
                    <span className='card-title'>Engagement:</span>{' '}
                    {calcEngagement(
                      userData.followers['7-29-24'],
                      post.comments.length,
                      post.likes
                    )}
                    %
                  </div>
                  <div>
                    <a
                      target='_blank'
                      href={`https:instagram.com/p/${postId}`}
                      className='primary-button align-self-center single-post-button'
                    >
                      View Post on Instagram
                    </a>
                  </div>
                </div>
              </Card>
            </Row>
            <div className='d-flex flex-wrap'>
              <Card className='post-card-box mb-4 me-4'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-green d-flex align-items-center justify-content-center'>
                    <EmojiGrin className='card-icon-green' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Positive Comments</h6>
                    <div>
                      <Card.Text className='card-number'>
                        {post.sentiment.positive}
                      </Card.Text>
                      <div className='post-bottom-percent'>(2.31%)</div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className='post-card-box mb-4 me-4'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-red d-flex align-items-center justify-content-center'>
                    <EmojiAngry className='card-icon-red' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Negative Comments</h6>
                    <div>
                      <Card.Text className='card-number'>
                        {post.sentiment.negative}
                      </Card.Text>
                      <div className='post-bottom-percent'>(2.31%)</div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className='post-card-box mb-4 me-4'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                    <EmojiNeutral className='card-icon-blue' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Neutral Comments</h6>
                    <Card.Text className='card-number'>-</Card.Text>
                    <div>
                      <div className='post-bottom-percent'>(2.31%)</div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className='post-card-box mb-4 me-4'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-orange d-flex align-items-center justify-content-center'>
                    <Question className='card-icon-orange' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Unknown Comments</h6>

                    <div>
                      <Card.Text className='card-number'>-</Card.Text>
                      <div className='post-bottom-percent'>(2.31%)</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <Row className='pb-4'>
              <Card className='post-card-box'>
                <div className='d-flex flex-column card-wrapper'>
                  <div className='pb-2'>
                    <div className='card-title'>
                      Comments:{' '}
                      <span
                        onClick={() => setShow(!show)}
                        className='show-link'
                      >{`(${show ? 'Hide ' : 'Show '}${
                        post.comments.length
                      } comments)`}</span>
                    </div>
                  </div>
                  {show &&
                    post.comments.map((comment, index) => (
                      <p key={index}>{comment}</p>
                    ))}
                </div>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  return <>{markup}</>;
}
