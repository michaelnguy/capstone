from flask import Flask, request, jsonify
import pickle
import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from nltk.stem import WordNetLemmatizer
import nltk

nltk.download("wordnet")

# Load the vectorizer and model
with open("vectoriser-ngram-(1,2).pickle", "rb") as f:
    vectoriser = pickle.load(f)

with open("Sentiment-LR.pickle", "rb") as f:
    model = pickle.load(f)

# Defining dictionary containing all emojis with their meanings.
emojis = {
    ":)": "smile",
    ":-)": "smile",
    ";d": "wink",
    ":-E": "vampire",
    ":(": "sad",
    ":-(": "sad",
    ":-<": "sad",
    ":P": "raspberry",
    ":O": "surprised",
    ":-@": "shocked",
    ":@": "shocked",
    ":-$": "confused",
    ":\\": "annoyed",
    ":#": "mute",
    ":X": "mute",
    ":^)": "smile",
    ":-&": "confused",
    "$_$": "greedy",
    "@@": "eyeroll",
    ":-!": "confused",
    ":-D": "smile",
    ":-0": "yell",
    "O.o": "confused",
    "<(-_-)>": "robot",
    "d[-_-]b": "dj",
    ":'-)": "sadsmile",
    ";)": "wink",
    ";-)": "wink",
    "O:-)": "angel",
    "O*-)": "angel",
    "(:-D": "gossip",
    "=^.^=": "cat",
}

## Defining set containing all stopwords in english.
stopwordlist = [
    "a",
    "about",
    "above",
    "after",
    "again",
    "ain",
    "all",
    "am",
    "an",
    "and",
    "any",
    "are",
    "as",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    "between",
    "both",
    "by",
    "can",
    "d",
    "did",
    "do",
    "does",
    "doing",
    "down",
    "during",
    "each",
    "few",
    "for",
    "from",
    "further",
    "had",
    "has",
    "have",
    "having",
    "he",
    "her",
    "here",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "i",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "itself",
    "just",
    "ll",
    "m",
    "ma",
    "me",
    "more",
    "most",
    "my",
    "myself",
    "now",
    "o",
    "of",
    "on",
    "once",
    "only",
    "or",
    "other",
    "our",
    "ours",
    "ourselves",
    "out",
    "own",
    "re",
    "s",
    "same",
    "she",
    "shes",
    "should",
    "shouldve",
    "so",
    "some",
    "such",
    "t",
    "than",
    "that",
    "thatll",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "until",
    "up",
    "ve",
    "very",
    "was",
    "we",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "whom",
    "why",
    "will",
    "with",
    "won",
    "y",
    "you",
    "youd",
    "youll",
    "youre",
    "youve",
    "your",
    "yours",
    "yourself",
    "yourselves",
]

app = Flask(__name__)


def preprocess(textdata):
    processedText = []

    # Create Lemmatizer and Stemmer.
    wordLemm = WordNetLemmatizer()

    # Defining regex patterns.
    urlPattern = r"((http://)[^ ]*|(https://)[^ ]*|( www\.)[^ ]*)"
    userPattern = "@[^\s]+"
    alphaPattern = "[^a-zA-Z0-9]"
    sequencePattern = r"(.)\1\1+"
    seqReplacePattern = r"\1\1"

    for tweet in textdata:
        tweet = tweet.lower()

        # Replace all URls with 'URL'
        tweet = re.sub(urlPattern, " URL", tweet)
        # Replace all emojis.
        for emoji in emojis.keys():
            tweet = tweet.replace(emoji, "EMOJI" + emojis[emoji])
        # Replace @USERNAME to 'USER'.
        tweet = re.sub(userPattern, " USER", tweet)
        # Replace all non alphabets.
        tweet = re.sub(alphaPattern, " ", tweet)
        # Replace 3 or more consecutive letters by 2 letter.
        tweet = re.sub(sequencePattern, seqReplacePattern, tweet)

        tweetwords = ""
        for word in tweet.split():
            # Checking if the word is a stopword.
            # if word not in stopwordlist:
            if len(word) > 1:
                # Lemmatizing the word.
                word = wordLemm.lemmatize(word)
                tweetwords += word + " "

        processedText.append(tweetwords)

    return processedText


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    texts = data["texts"]

    # Predict the sentiment
    textdata = vectoriser.transform(preprocess(texts))
    sentiment = model.predict(textdata)

    # Make a list of text with sentiment.
    results = []
    for text, pred in zip(texts, sentiment):
        results.append({"text": text, "sentiment": int(pred)})

    return jsonify(results)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
