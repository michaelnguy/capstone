import React, { useState } from 'react';
import axios from 'axios';

import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap';
import { ReactComponent as Loader } from '../assets/loader.svg';

const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;

export default function Hashtag() {
  const [imageUrl, setImageUrl] = useState('');
  const [hashtags, setHashtags] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:3001/get_hashtags',
  //       {
  //         image_url: imageUrl,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  //         },
  //       }
  //     );
  //     setHashtags(response.data.tags[0]);
  //     setError(null);
  //     setLoading(false);
  //   } catch (error) {
  //     setError('There was an error processing your request.');
  //     setLoading(false);
  //   }
  // };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!file) {
      console.error('No file selected');
      setError('No file selected');
      setLoading(false);
      return;
    }

    try {
      const data = await file.arrayBuffer(); // Convert the file to an ArrayBuffer

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
        data,
        {
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setHashtags(response.data); // Save the response data to state
      setLoading(false);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error querying the model:', error.response.data.error);
      setLoading(false);
      setHashtags(null);
      setError(error.response.data.error);
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
                <Form.Group controlId='formFile' className='mb-3'>
                  <Form.Label>Select a .jpeg or .png</Form.Label>
                  <Form.Control type='file' onChange={handleFileChange} />
                </Form.Group>
                <Button
                  style={{ width: '80px' }}
                  variant='primary'
                  type='submit'
                  disabled={loading}
                >
                  {!loading ? 'Submit' : <Loader className='spinner' />}
                </Button>
              </Form>
              {/* Display error message if there's an error */}
              {error && <p className='text-danger mt-2'>{error}</p>}
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
                      <li key={index}>#{hashtag.label}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
