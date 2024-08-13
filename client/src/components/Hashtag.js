import React, { useState } from 'react';
import axios from 'axios';

import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap';

export default function Hashtag() {
  const [imageUrl, setImageUrl] = useState('');
  const [hashtags, setHashtags] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3001/get_hashtags',
        {
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );
      setHashtags(response.data.tags[0]);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError('There was an error processing your request.');
      setLoading(false);
    }
  };

  return (
    <Container className='hashtag-body-container'>
      <Row className=''>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='dashboard-heading'>Hashtag Recommendation</h2>
        </div>
      </Row>
      <div className='hashtag-outer-wrapper'>
        <div className='hashtag-inner-wrapper'>
          <Row>
            <Col xs={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formUrl'>
                  <Form.Label>Image url</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter a URL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    Enter a url of an image and we'll determine hashtags for
                    you.
                  </Form.Text>
                </Form.Group>
                <Button variant='primary' type='submit'>
                  {loading ? 'loading...' : 'Submit'}
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {' '}
            <Col xs={5}>
              {/* Display hashtags if available */}
              {hashtags && (
                <div className='mt-3'>
                  <h5>Recommended Hashtags:</h5>
                  <ul>
                    {hashtags.map((hashtag, index) => (
                      <li key={index}>#{hashtag}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Display error message if there's an error */}
              {error && <p className='text-danger'>{error}</p>}
            </Col>
            <Col xs={7}>
              <Image src={imageUrl} fluid />
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
