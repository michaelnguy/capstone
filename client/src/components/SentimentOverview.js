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
  Question,
} from 'react-bootstrap-icons';
import axios from 'axios';

import BarChart from './BarChart';
import { calcEngagementForList } from '../util/functions';

export default function SentimentOverview({ userData }) {
  const [posts, setPosts] = useState([]);
  const [datePosts, setDatePosts] = useState([]);
  const [taggedPosts, setTaggedPosts] = useState([]);
  const [time, setTime] = useState('All Time');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTag, setSelectedTag] = useState('All Tags');

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
      setDatePosts(filterDate(time));
      console.log(datePosts);
    }
  }, [posts, time]);

  useEffect(() => {
    if (posts.length > 0) {
      setTaggedPosts(calcTopicPosts());
    }
  }, [posts, selectedTag]);

  const filterDate = (_days) => {
    //Filter posts for selected time period
    let numOfPosts;
    switch (_days) {
      case 'All Time':
        numOfPosts = posts.length;
        break;
      case '7 days':
        // code block
        numOfPosts = 10;
        break;
      case '30 days':
        numOfPosts = 19;
        break;
      default:
        numOfPosts = 25;
    }

    const timePeriodPosts = posts.slice(0, numOfPosts);

    return timePeriodPosts;
  };

  const calcSentStats = (postDict) => {
    // Calculate the total number of comments
    const totalComments = postDict.reduce(
      (acc, dict) => acc + dict.comments.length,
      0
    );

    const posComments = postDict.reduce(
      (acc, dict) => acc + dict.sentiment.positive,
      0
    );
    const negComments = postDict.reduce(
      (acc, dict) => acc + dict.sentiment.negative,
      0
    );
    // const neuComments = postDict.reduce(
    //   (acc, dict) => acc + dict.sentiment.positive,
    //   0
    // );
    // const unkComments = postDict.reduce(
    //   (acc, dict) => acc + dict.sentiment.positive,
    //   0
    // );

    const posPercentage = Math.round((posComments / totalComments) * 100);
    const negPercentage = Math.round((negComments / totalComments) * 100);
    // const neuPercentage = neuComments / totalComments;
    // const unkPercentage = unkComments / totalComments;

    return {
      totalComments,
      posComments,
      negComments,
      neuComments: 351,
      unkComments: 23,
      posPercentage,
      negPercentage,
      neuPercentage: 24,
      unkPercentage: 12,
    };
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
    unkComments,
    posPercentage,
    negPercentage,
    neuPercentage,
    unkPercentage,
  } = calcSentStats(filterDate(time));

  //calculate sentiment for tag
  const {
    totalComments: tagTotalComments,
    posComments: tagPosComments,
    negComments: tagNegComments,
    neuComments: tagNeuComments,
    unkComments: tagUnkComments,
    posPercentage: tagPosPerc,
    negPercentage: tagNegPerc,
    neuPercentage: tagNeuPerc,
    unkPercentage: tagUnkPerc,
  } = calcSentStats(taggedPosts);

  return (
    <Container className='sentiment-body-container'>
      <Row>
        <h2 className='dashboard-heading'>Sentiment Overview</h2>
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
                <div className='card-wrapper overview-card-title'>
                  Last updated:
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
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
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={3}>
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
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
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
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                    <EmojiNeutral className='card-icon-blue' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Neutral Comments</h6>
                    <Card.Text className='card-number'>{neuComments}</Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-orange d-flex align-items-center justify-content-center'>
                    <Question className='card-icon-orange' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Unknown Comments</h6>
                    <Card.Text className='card-number'>{unkComments}</Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <BarChart
              posPercentage={posPercentage}
              negPercentage={negPercentage}
            />
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
            <Col xs={3}>
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
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
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
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
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
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-green d-flex align-items-center justify-content-center'>
                    <EmojiGrin className='card-icon-green' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Positive Comments</h6>
                    <Card.Text className='card-number'>{tagPosPerc}%</Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-red d-flex align-items-center justify-content-center'>
                    <PatchExclamation className='card-icon-red' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Negative Comments</h6>
                    <Card.Text className='card-number'>{tagNegPerc}%</Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-blue d-flex align-items-center justify-content-center'>
                    <EmojiNeutral className='card-icon-blue' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Neutral Comments</h6>
                    <Card.Text className='card-number'>
                      {tagNeuComments}
                    </Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='overview-card-box'>
                <div className='d-flex card-wrapper align-items-center'>
                  <div className='icon-container icon-container-orange d-flex align-items-center justify-content-center'>
                    <Question className='card-icon-orange' size={28} />
                  </div>
                  <div>
                    <h6 className='card-title'>Unknown Comments</h6>
                    <Card.Text className='card-number'>
                      {tagUnkComments}
                    </Card.Text>
                    <Card.Text className='d-flex card-bottom-wrapper align-items-center'>
                      <ArrowUpShort
                        className='card-bottom-arrow-green'
                        size={20}
                      />
                      <div className='card-bottom-percent'>+2.31%</div>
                      <div className='card-bottom-text ms-1'>(30 days)</div>
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <BarChart posPercentage={tagPosPerc} negPercentage={tagNegPerc} />
          </Row>
        </div>
      </div>

      {/* <Row>
        <img
          className='graph'
          style={{ marginTop: '20px', width: '1200px' }}
          src={graph}
          alt='app logo'
        />
      </Row> */}
    </Container>
  );
}
