import React, { useState, useEffect, useContext } from 'react';

import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
  ChatDots,
  PatchExclamation,
  ChatHeart,
  EmojiGrin,
  EmojiAngry,
  EmojiNeutral,
  ArrowUpShort,
  ArrowDownShort,
  Question,
} from 'react-bootstrap-icons';
import axios from 'axios';

import BarChart from './BarChart';
import SentimentLineChart from './SentimentLineChart';
import {
  calcEngagementForList,
  calcSentStats,
  formatDate,
} from '../util/functions';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function SentimentOverview({ userData }) {
  const [posts, setPosts] = useState([]);
  const [datePosts, setDatePosts] = useState([]);
  const [taggedPosts, setTaggedPosts] = useState([]);
  const [time, setTime] = useState('All Time');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTag, setSelectedTag] = useState('All Tags');

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

  useEffect(() => {
    if (posts.length > 0) {
      setDatePosts(filterPostsByDate(time));
    }
  }, [posts, time]);

  useEffect(() => {
    if (posts.length > 0) {
      setTaggedPosts(calcTopicPosts());
    }
  }, [posts, selectedTag]);

  const filterPostsByDate = (filterType) => {
    const targetDate = new Date('2024-08-07T00:00:00+0000');
    const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
    const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000;

    if (filterType === '7 days') {
      return posts.filter((post) => {
        const postDate = new Date(post.igTimestamp);
        const timeDifference = Math.abs(targetDate - postDate);
        return timeDifference <= sevenDaysInMillis;
      });
    } else if (filterType === '30 days') {
      return posts.filter((post) => {
        const postDate = new Date(post.igTimestamp);
        const timeDifference = Math.abs(targetDate - postDate);
        return timeDifference <= thirtyDaysInMillis;
      });
    } else {
      // Show all posts
      return posts;
    }
  };

  const calcTopicPosts = () => {
    if (selectedTag === 'All Tags') {
      return posts;
    }
    return posts.filter((post) => post.tags.includes(selectedTag));
  };

  //unique tags for dropdown
  const allTags = posts.map((dict) => dict.tags).flat();
  const uniqueTags = [...new Set(allTags)];

  //calculate sentiment for time period
  const {
    totalComments,
    posComments,
    negComments,
    neuComments,
    posPercentage,
    negPercentage,
    neuPercentage,
  } = calcSentStats(filterPostsByDate(time));

  const {
    totalComments: totalCommentsAll,
    posComments: posCommentsAll,
    negComments: negCommentsAll,
    neuComments: neuCommentsAll,
    posPercentage: posPercAll,
    negPercentage: negPercAll,
    neuPercentage: neuPercAll,
  } = calcSentStats(filterPostsByDate('All Time'));

  //calculate sentiment for tag
  const {
    totalComments: tagTotalComments,
    posComments: tagPosComments,
    negComments: tagNegComments,
    neuComments: tagNeuComments,
    posPercentage: tagPosPerc,
    negPercentage: tagNegPerc,
    neuPercentage: tagNeuPerc,
  } = calcSentStats(taggedPosts);

  const posVsAvg = posPercentage - posPercAll;
  const negVsAvg = negPercentage - negPercAll;
  const neuVsAvg = neuPercentage - neuPercAll;

  return loading ? (
    <Container
      style={{ minHeight: '45vh', marginTop: '10rem' }}
      className='d-flex justify-content-center align-items-center'
    >
      <div className='lds-dual-ring-singlepiece'></div>
    </Container>
  ) : (
    <Container className='sentiment-body-container'>
      <Row className=''>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='dashboard-heading'>Sentiment Overview</h2>
          <div className='card-wrapper overview-card-title'>
            Last updated: {posts.length > 0 && formatDate(posts[0].igTimestamp)}
          </div>
        </div>
      </Row>

      <div className='section-outer-wrapper'>
        <div className='section-inner-wrapper'>
          <Row>
            <Col className='mb-2' xs={12}>
              <div className='selector-row d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <div className='card-wrapper overview-card-title'>
                    Viewing:
                  </div>
                  <DropdownButton
                    variant='secondary'
                    align='end'
                    title={time}
                    id='dropdown-menu-align-end'
                  >
                    <Dropdown.Item
                      key={'All Time'}
                      onClick={() => setTime('All Time')}
                      eventKey={'All Time'}
                    >
                      All Time
                    </Dropdown.Item>
                    <Dropdown.Item
                      key={'7 days'}
                      onClick={() => setTime('7 days')}
                      eventKey={'7 days'}
                    >
                      7 days
                    </Dropdown.Item>
                    <Dropdown.Item
                      key={'30 days'}
                      onClick={() => setTime('30 days')}
                      eventKey={'30 days'}
                    >
                      30 days
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} lg={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-purple d-flex align-items-center justify-content-center'>
                    <ChatDots className='card-icon-purple' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Total Comments</h6>
                    <Card.Text className='card-number'>
                      {totalComments}
                    </Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'></Card.Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={6} lg={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-green d-flex align-items-center justify-content-center'>
                    <EmojiGrin className='card-icon-green' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Positive Comments</h6>
                    <Card.Text className='card-number'>
                      {posPercentage}%
                    </Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <div className='card-bottom-percent'>
                        {posVsAvg >= 0 && '+'}
                        {posVsAvg}%
                      </div>
                      <div className='card-bottom-text ms-1'>(vs. avg)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={6} lg={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-red d-flex align-items-center justify-content-center'>
                    <EmojiAngry className='card-icon-red' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Negative Comments</h6>
                    <Card.Text className='card-number'>
                      {negPercentage}%
                    </Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <div className='card-bottom-percent'>
                        {negVsAvg >= 0 && '+'}
                        {negVsAvg}%
                      </div>
                      <div className='card-bottom-text ms-1'>(vs. avg)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={6} lg={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                    <EmojiNeutral className='card-icon-blue' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Neutral Comments</h6>
                    <Card.Text className='card-number'>
                      {neuPercentage}%
                    </Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <div className=''>
                        {neuVsAvg >= 0 && '+'}
                        {neuVsAvg}%
                      </div>
                      <div className='card-bottom-text ms-1'>(vs. avg)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='justify-content-xs-center'>
              <div className='overview-barchart-wrapper justify-content-xs-center'>
                <BarChart
                  posPercentage={posPercentage}
                  negPercentage={negPercentage}
                  neuPercentage={neuPercentage}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className='overview-linechart-wrapper'>
                <SentimentLineChart posts={datePosts} />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className='section-outer-wrapper py-5'>
        <div className='section-inner-wrapper'>
          <Row>
            <Col className='mb-2' xs={12}>
              <div className='selector-row d-flex align-items-center'>
                <div className='card-wrapper overview-card-title'>
                  Tag Filter:
                </div>
                <DropdownButton
                  variant='secondary'
                  align='end'
                  title={selectedTag}
                  id='dropdown-menu-align-end'
                >
                  <Dropdown.Item
                    eventKey='All Tags'
                    onClick={() => setSelectedTag('All Tags')}
                  >
                    All Tags
                  </Dropdown.Item>
                  {uniqueTags.sort().map((tag, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSelectedTag(tag)}
                      eventKey={tag}
                    >
                      {tag}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6} className='d-flex flex-wrap'>
              <Col className='tag-column' xs={6}>
                <Card className='overview-card-box'>
                  <div className='d-flex card-wrapper align-items-center'>
                    <div className='icon-container icon-container-purple d-flex align-items-center justify-content-center'>
                      <ChatDots className='card-icon-purple' size={28} />
                    </div>
                    <div>
                      <h6 className='card-title'>Total Posts</h6>
                      <Card.Text className='card-number'>
                        {taggedPosts.length}
                      </Card.Text>
                      <Card.Text className='d-flex card-bottom-wrapper align-items-center'></Card.Text>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className='tag-column' xs={6}>
                <Card className='overview-card-box'>
                  <div className='d-flex card-wrapper align-items-center'>
                    <div className='icon-container icon-container-teal d-flex align-items-center justify-content-center'>
                      <ChatHeart className='card-icon-teal' size={28} />
                    </div>
                    <div>
                      <h6 className='card-title'>Engagement</h6>
                      <Card.Text className='card-number'>
                        {calcEngagementForList(userData, taggedPosts)}%
                      </Card.Text>
                      <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                        <div className='card-bottom-percent'>
                          {(
                            calcEngagementForList(userData, taggedPosts) -
                            calcEngagementForList(userData, posts)
                          ).toFixed(2) >= 0 && '+'}
                          {(
                            calcEngagementForList(userData, taggedPosts) -
                            calcEngagementForList(userData, posts)
                          ).toFixed(2)}
                          %
                        </div>
                        <div className='card-bottom-text ms-1'>(vs. all)</div>
                      </Card.Text>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className='tag-column' xs={6}>
                <Card className='overview-card-box'>
                  <div className='d-flex card-wrapper align-items-center'>
                    <div className='icon-container icon-container-lime d-flex align-items-center justify-content-center'>
                      <ChatDots className='card-icon-lime' size={28} />
                    </div>
                    <div>
                      <h6 className='card-title'>Comments per Post</h6>
                      <Card.Text className='card-number'>
                        {Math.round(tagTotalComments / taggedPosts.length)}
                      </Card.Text>
                      <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                        <div className='card-bottom-percent'>
                          {Math.round(tagTotalComments / taggedPosts.length) -
                            Math.round(totalCommentsAll / posts.length) >=
                            0 && '+'}
                          {Math.round(tagTotalComments / taggedPosts.length) -
                            Math.round(totalCommentsAll / posts.length)}
                        </div>
                        <div className='card-bottom-text ms-1'>(vs. all)</div>
                      </Card.Text>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className='tag-column' xs={6}>
                <Card className='overview-card-box'>
                  <div className='d-flex card-wrapper align-items-center'>
                    <div className='icon-container icon-container-green d-flex align-items-center justify-content-center'>
                      <EmojiGrin className='card-icon-green' size={28} />
                    </div>
                    <div>
                      <h6 className='card-title'>Positive Comments</h6>
                      <Card.Text className='card-number'>
                        {tagPosPerc}%
                      </Card.Text>
                      <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                        <div className='card-bottom-percent'>
                          {tagPosPerc - posPercAll >= 0 && '+'}
                          {tagPosPerc - posPercAll}%
                        </div>
                        <div className='card-bottom-text ms-1'>(vs. all)</div>
                      </Card.Text>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className='tag-column' xs={6}>
                <Card className='overview-card-box'>
                  <div className='d-flex card-wrapper align-items-center'>
                    <div className='icon-container icon-container-red d-flex align-items-center justify-content-center'>
                      <PatchExclamation className='card-icon-red' size={28} />
                    </div>
                    <div>
                      <h6 className='card-title'>Negative Comments</h6>
                      <Card.Text className='card-number'>
                        {tagNegPerc}%
                      </Card.Text>
                      <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                        <div className='card-bottom-percent'>
                          {tagNegPerc - negPercAll >= 0 && '+'}
                          {tagNegPerc - negPercAll}%
                        </div>
                        <div className='card-bottom-text ms-1'>(vs. all)</div>
                      </Card.Text>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className='tag-column' xs={6}>
                <Card className='overview-card-box'>
                  <div className='d-flex card-wrapper align-items-center'>
                    <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                      <EmojiNeutral className='card-icon-blue' size={28} />
                    </div>
                    <div>
                      <h6 className='card-title'>Neutral Comments</h6>
                      <Card.Text className='card-number'>
                        {tagNeuPerc}%
                      </Card.Text>
                      <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                        <div className='card-bottom-percent'>
                          {tagNeuPerc - neuPercAll >= 0 && '+'}
                          {tagNeuPerc - neuPercAll}%
                        </div>
                        <div className='card-bottom-text ms-1'>(vs. all)</div>
                      </Card.Text>
                    </div>
                  </div>
                </Card>
              </Col>
            </Col>
            <Col xs={6}>
              <div className='tag-barchart-wrapper'>
                <BarChart
                  posPercentage={tagPosPerc}
                  negPercentage={tagNegPerc}
                  neuPercentage={tagNeuPerc}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
