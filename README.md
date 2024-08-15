# VibeMetrics Instagram Dashboard for SIADS699_ss24_234

## Introduction

This is the submission by group 24 for their MADS capstone final project. It is a web application that leverages machine learning models for the purpose of Instagram social media analysis. We integrate a comment sentiment analyzer and hashtag recommender into a full-stack web application. We aim to provide end-users who may not have data science knowledge a way to use data science tools for guidance on their social media strategy.

This repo consists of 5 separate directories: a React web client, a Node.js backend web server, a Flask machine learning server, model training of the sentiment analyzer, and model training of the hashtag recommender.

## Getting Started

<br />

### Requirements

Client and Web server\*- Node.js v20.15.0^

Flask server and model training\*\* - Python 3.10.14

\*Further requirements in package.json files in respective directories

\*\*Further requirements in requirements.txt files in respective directories

### Installation and Setup

After cloning the repo:

#### Client

```sh
cd client
npm install
```

Create .env.development file in client directory:

```js
REACT_APP_HF_TOKEN = 'ENTER YOUR HUGGING FACE ACCESS TOKEN';
REACT_APP_API_ENDPOINT = 'http://localhost:3001';
```

```sh
npm run start
```

#### Web server

```sh
cd server
npm install
```

Create .env file in server directory:

```js
MONGO_ATLAS_PW = 'Enter your Mongo DB Atlas password';
SECRET_KEY = 'Enter any text to create key for jsonWebToken';
```

```sh
npm run dev
```

#### Flask predict server

```sh
cd predict_server
pip install -r requirements.txt
flask –app app.py run
```

#### Hashtag_rec

```sh
cd hashtag_rec
pip install -r /scripts/requirements.txt
```
