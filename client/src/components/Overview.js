import React, { useState, useEffect, useContext } from 'react';

import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
  Person,
  Heart,
  ChatHeart,
  Mouse,
  ArrowUpShort,
} from 'react-bootstrap-icons';
import axios from 'axios';

import dummyData from '../dummyData/user.json';
import { AuthContext } from '../context/auth';
import {
  calcCommentsPerPost,
  calcEngagementForList,
  calcLikesPerPost,
  formatDate,
} from '../util/functions';
import SimpleLineChart from './LineChart';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Overview() {
  const { user, state, dispatch } = useContext(AuthContext);
  let userData;
  if (user.email === 'tide@email.com') {
    userData = dummyData.tide;
  } else {
    userData = dummyData['12pell'];
  }

  const [posts, setPosts] = useState([]);
  const [chartType, setChartType] = useState('Followers');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getDictValue = (_dict, _pos) => {
    const values = Object.values(_dict);
    let value;
    if (_pos === -1) {
      value = values[values.length - 1];
    } else if (_pos === 0) {
      value = values[0];
    }

    return value;
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const token = localStorage.getItem('jwtToken');

      try {
        const response = await axios.get(`${ENDPOINT}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return loading ? (
    <Container
      style={{ minHeight: '45vh', marginTop: '10rem' }}
      className='d-flex justify-content-center align-items-center'
    >
      <div className='lds-dual-ring-singlepiece'></div>
    </Container>
  ) : (
    <Container className='dashboard-body-container'>
      <Row className=''>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='dashboard-heading'>Dashboard</h2>
          <div className='card-wrapper overview-card-title'>
            Last updated: {posts.length > 0 && formatDate(posts[0].igTimestamp)}
          </div>
        </div>
      </Row>
      <Row>
        <Col xs={6} lg={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-purple d-flex align-items-center justify-content-center'>
                <Person className='card-icon-purple' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Followers</h6>
                <Card.Text className='card-number'>
                  {getDictValue(userData.followers, -1)}
                </Card.Text>
                <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                  <ArrowUpShort className='card-bottom-arrow-green' size={20} />
                  <div className='card-bottom-percent'>
                    {getDictValue(userData.followers, -1) -
                      getDictValue(userData.followers, 0)}
                  </div>
                  <div className='card-bottom-text ms-1'>(30 days)</div>
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} lg={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                <ChatHeart className='card-icon-blue' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Avg Engagement</h6>
                <Card.Text className='card-number'>
                  {posts && calcEngagementForList(userData, posts)}%
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} lg={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-orange d-flex align-items-center justify-content-center'>
                <Mouse className='card-icon-orange' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Comments Per Post</h6>
                <Card.Text className='card-number'>
                  {posts && calcCommentsPerPost(posts)}
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} lg={3}>
          <Card className='card-box'>
            <div className='d-flex card-wrapper align-items-center'>
              <div className='icon-container icon-container-green d-flex align-items-center justify-content-center'>
                <Heart className='card-icon-green' size={28} />
              </div>
              <div>
                <h6 className='card-title'>Likes Per Post</h6>
                <Card.Text className='card-number'>
                  {posts && calcLikesPerPost(posts)}
                </Card.Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <div className='overview-outer-wrapper mt-4'>
        <div className='overview-inner-wrapper'>
          <Row>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='card-wrapper overview-card-title'>Viewing:</div>
                <DropdownButton
                  variant='secondary'
                  align='end'
                  title={chartType}
                  id='dropdown-menu-align-end'
                >
                  <Dropdown.Item
                    key={'Followers'}
                    onClick={() => setChartType('Followers')}
                    eventKey={'Followers'}
                  >
                    Followers
                  </Dropdown.Item>
                  <Dropdown.Item
                    key={'Engagement'}
                    onClick={() => setChartType('Engagement')}
                    eventKey={'Engagement'}
                  >
                    Engagement
                  </Dropdown.Item>
                  <Dropdown.Item
                    key={'Comments'}
                    onClick={() => setChartType('Comments')}
                    eventKey={'Comments'}
                  >
                    Comments
                  </Dropdown.Item>
                  <Dropdown.Item
                    key={'Likes'}
                    onClick={() => setChartType('Likes')}
                    eventKey={'Likes'}
                  >
                    Likes
                  </Dropdown.Item>
                </DropdownButton>
              </div>

              <div className='graph-container-inner'>
                <SimpleLineChart
                  followerData={userData}
                  posts={posts}
                  chartType={chartType}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
