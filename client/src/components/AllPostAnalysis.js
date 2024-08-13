import React, { useState, useContext, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.js';
import axios from 'axios';

import {
  formatDate,
  calcEngagement,
  calculateSentimentPercentages,
} from '../util/functions.js';

export default function AllPostAnalysis({ userData }) {
  const { state, dispatch } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('jwtToken');

      try {
        const response = await axios.get('http://localhost:3001/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);

        const percentages_holder = fetchedPosts.map(
          calculateSentimentPercentages
        );
        setPercentages(percentages_holder);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container className='posts-body-container'>
      <Row className=''>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='dashboard-heading'>
            Latest Posts -{' '}
            <span style={{ fontWeight: '300' }}>(Click Post for Details)</span>
          </h2>
          <div className='card-wrapper overview-card-title'>Last updated:</div>
        </div>
      </Row>
      <div className='posts-table-outercontainer'>
        <div className='posts-table-innercontainer'>
          <Row className='table-row-label'>
            <Col className='table-label' xs={1}>
              Image
            </Col>
            <Col className='table-label' xs={1}>
              Time
            </Col>
            <Col className='table-label' xs={2}>
              Tags
            </Col>
            <Col className='table-label' xs={1}>
              Comments
            </Col>
            <Col className='table-label' xs={1}>
              Engage
            </Col>
            <Col className='table-label' xs={2}>
              Positive
            </Col>
            <Col className='table-label' xs={2}>
              Negative
            </Col>
            <Col className='table-label' xs={2}>
              Neutral
            </Col>
          </Row>
          {posts.map((post, index) => (
            <Link
              to={`/app/posts/${post.igId}`}
              key={post.igId}
              style={{ textDecoration: 'none' }}
            >
              <Row className='table-row-post'>
                <Col className='table-label' xs={1}>
                  <img
                    style={{ height: '50px', width: '40px' }}
                    src={require(`../images/igDemo/${index + 1}.jpg`)}
                    alt='post'
                  />
                </Col>
                <Col className='table-text' xs={1}>
                  {formatDate(post.igTimestamp)}
                </Col>
                <Col className='table-text' xs={2}>
                  {`${post.tags.join(', ')}`}
                </Col>
                <Col className='table-text' xs={1}>
                  {post.comments.length}
                </Col>
                <Col className='table-text' xs={1}>
                  {calcEngagement(
                    userData.followers['7-29-24'],
                    post.likes,
                    post.comments.length
                  )}
                  %
                </Col>
                <Col className='table-text' xs={2}>
                  {Math.round(percentages[index].posPercent * 100)}%
                </Col>
                <Col className='table-text' xs={2}>
                  {Math.round(percentages[index].negPercent * 100)}%
                </Col>
                <Col className='table-text' xs={2}>
                  {Math.round(percentages[index].neuPercent * 100)}%
                </Col>
              </Row>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
