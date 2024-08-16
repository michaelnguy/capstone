# VibeMetrics Instagram Dashboard for SIADS699_ss24_234

## Introduction

This is the submission by group 24 for their MADS capstone final project. It is a web application that leverages machine learning models for the purpose of Instagram social media analysis. We integrate a comment sentiment analyzer and hashtag recommender into a full-stack web application. We aim to provide end-users who may not have data science knowledge a way to use data science tools for guidance on their social media strategy.

This repo consists of 5 separate directories: a React web client, a Node.js backend web server, a Flask machine learning server, model training of the sentiment analyzer, and model training of the hashtag recommender.

## Getting Started

### Data Sources

#### Hashtag Recommendation

1. The hashtag_rec portion of the project requires the HARRISON dataset from Park et al. This dataset is openly on kaggle and github [here](https://github.com/minstone/HARRISON-Dataset). For convenience, a Google drive link to the dataset can be found [here](https://drive.google.com/file/d/1m3u0vVw-DzaVsQNvyW_PtbMKZjzEAsC2/view?usp=sharing)(link only available to University of Michigan accounts).

2. Unzip the folder and copy its contents to the preexisting empty HARRISON folder.

3. Download the following files from their drive links (links only available to University of Michigan accounts).
   - [clip_tag_embs.txt](https://drive.google.com/file/d/1aLi0V5lnTdeB426EgP8fHSamglmC_kdU/view?usp=drive_link)
   - [data_embeddings.txt](https://drive.google.com/file/d/1c18eQKmcgY3HwACJOYC52G0lAPFpp_jf/view?usp=drive_link)
   - [data_indices_split.json](https://drive.google.com/file/d/1efRcJD-I3Ph7-u2Mw5IBVqSsW_noydeV/view?usp=drive_link)

4. The final HARRISON folder should consist of:

```
    instagram_dataset/
    clip_tag_embs.txt
    data_embeddings.txt
    data_indices_split.json
    data_list.txt
    tag_list.txt
```

#### Sentiment Analysis

1. The Sentiment Analysis portion of the project required data from K. Chai and and P. Kashish, but are already included in this repo. These datasets are openly available [here](https://www.kaggle.com/datasets/cosmos98/twitter-and-reddit-sentimental-analysis-dataset/data) and [here](https://www.kaggle.com/datasets/kashishparmar02/social-media-sentiments-analysis-dataset/data).

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
pip install -r ./scripts/requirements.txt
```

**Getting recommended tags**

Step 1: Set up recommender
````
from recommenders import ImageIndexTagRecommender

recommender = ImageIndexTagRecommender(img_index, train_idx_mapping, tags_list)
img_vectorizer = get_image_vectorizer_for_recommender()
````

Step 2: Get image

![](https://live.staticflickr.com/7707/16525630273_09bd1f9bf3_n.jpg)

````
from image_utils import get_image_from_url
img = get_image_from_url(img_url)
````

Step 3: Call recommender
````
recommender.get_tags_for_image(img, img_vectorizer)

# by default, recommend 5 tags per image
[['sunset', 'sea', 'beach', 'landscape', 'nature']]
````

See the notebook `hashtag_recommender.ipynb` in `hashtag_rec` directory for more methods to generate hashtag recommendations.

#### Sentiment Model

```sh
cd sentiment_model
pip install -r requirements.txt
```

## Data Sources

Charan Gowda, Anirudh, Akshay Pai, and Chaithanya kumar A. (2019). Twitter and Reddit Sentimental analysis Dataset [Data set]. Kaggle.

Kashish Parmar. (2024) Social Media Sentiments Analysis Dataset [Data set]. Kaggle.

Park, M., Li, H., & Kim, J. (2016). "HARRISON: A Benchmark on HAshtag Recommendation for Real-world Images in Social Networks," ArXiv.
