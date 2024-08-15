# VibeMetrics Instagram Dashboard for SIADS699_ss24_234

## Introduction

This is the submission by group 24 for their MADS capstone final project. It is a web application that leverages machine learning models for the purpose of Instagram social media analysis. We integrate a comment sentiment analyzer and hashtag recommender into a full-stack web application. We aim to provide end-users who may not have data science knowledge a way to use data science tools for guidance on their social media strategy.

This repo consists of 5 separate directories: a React web client, a Node.js backend web server, a Flask machine learning server, model training of the sentiment analyzer, and model training of the hashtag recommender.

## Getting Started

### Data Sources

1. The hashtag_rec portion of the project requires the HARRISON dataset from Park et al. A Google drive link to the dataset can be found [here](https://drive.google.com/file/d/1m3u0vVw-DzaVsQNvyW_PtbMKZjzEAsC2/view?usp=sharing)(link only available to University of Michigan accounts).

2. Unzip the folder and copy its contents to the preexisting empty HARRISON folder.

3. Download data_embeddings.txt and data_indices_split.json from their drive links (links only available to University of Michigan accounts).
   [link 1](https://drive.google.com/file/d/1c18eQKmcgY3HwACJOYC52G0lAPFpp_jf/view?usp=drive_link)
   [link 2](https://drive.google.com/file/d/1wfr-n5yh-dQSHu_N67psG7QDEIlvLJP6/view?usp=drive_link)

4. The final HARRISON folder should consist of:

```
    instagram_dataset/
    data_embeddings.txt
    data_indices_split.json
    data_list.txt
    tag_list.txt
```

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

#### Sentiment Model

```sh
cd sentiment_model
pip install -r requirements.txt
```

## Data Sources

Park et al., "HARRISON: A Benchmark on HAshtag Recommendation for Real-world Images in Social Networks," ArXiv, 2016
