from flask import Flask, request, jsonify
import pandas as pd
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer
import emoji
import contractions
from io import BytesIO
from PIL import Image
from collections import OrderedDict
import requests
import torch
import sys
import os
from transformers import AutoImageProcessor, ViTModel


sys.path.append(os.path.dirname(__file__))
IMG_MODEL_NAME = "google/vit-base-patch16-224-in21k"

VIT_IMAGE_PROCESSOR = AutoImageProcessor.from_pretrained(IMG_MODEL_NAME)
VIT_MODEL = ViTModel.from_pretrained(IMG_MODEL_NAME)


def get_image_from_url(img_url):
    response = requests.get(img_url)
    img = Image.open(BytesIO(response.content))
    return img


def get_embeddings_from_model(images, image_processor, model):
    inputs = image_processor(images, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    last_hidden_states = outputs.last_hidden_state
    embeddings = last_hidden_states[:, 0].cpu()
    return embeddings


def img_vectorizer(images):
    embeddings = get_embeddings_from_model(images, VIT_IMAGE_PROCESSOR, VIT_MODEL)
    return embeddings.numpy()


# Load the vectorizer and model
with open("vectorizer.pickle", "rb") as f:
    vectoriser = pickle.load(f)

with open("Sentiment-LR.pickle", "rb") as f:
    model = pickle.load(f)

nltk.download("wordnet")
nltk.download("omw-1.4")
nltk.download("punkt")
nltk.download("stopwords")

# Initialize the necessary tools
lemmatizer = WordNetLemmatizer()
stemmer = PorterStemmer()
stop_words = set(stopwords.words("english"))


def expand_contractions(text):
    return contractions.fix(text)


app = Flask(__name__)


with open("recommender.pkl", "rb") as f:
    recommender_test = pickle.load(f)


@app.route("/get_hashtags", methods=["POST"])
def get_hashtags():
    try:
        data = request.json
        image_url = data["image_url"]

        # Process the image and get hashtags
        image = get_image_from_url(image_url)
        images = [image]
        pred_tags = recommender_test.get_tags_for_image(images, img_vectorizer)

        return jsonify({"image_url": image_url, "tags": pred_tags})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Expand contractions
    text = expand_contractions(text)
    # Convert emojis to text
    text = emoji.demojize(text)
    # Remove URLs
    text = re.sub(r"http\S+|www\S+|https\S+", " ", text, flags=re.MULTILINE)
    # Remove mentions and hashtags
    text = re.sub(r"@\w+|#\w+", " ", text)
    # Remove special characters and numbers
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    # Tokenize text
    tokens = nltk.word_tokenize(text)
    # Lemmatize and stem each token
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token is not None]
    tokens = [stemmer.stem(token) for token in tokens]
    # Remove stop words
    tokens = [token for token in tokens if token not in stop_words]
    # Remove duplicate tokens while preserving order
    tokens = list(OrderedDict.fromkeys(tokens))
    # Remove extra whitespace
    text = " ".join(tokens)
    text = re.sub(r"\s+", " ", text).strip()
    return text


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        texts = data["texts"]

        # Predict the sentiment
        preprocessed_texts = [preprocess_text(text) for text in texts]
        textdata = vectoriser.transform(preprocessed_texts)
        sentiment = model.predict(textdata)

        # Make a list of text with sentiment.
        results = []
        for text, pred in zip(texts, sentiment):
            # Look for positive emojis and hard code sentiment

            results.append({"text": text, "sentiment": int(pred)})

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
