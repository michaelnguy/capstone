from PIL import Image
import requests
from io import BytesIO
from constants import IMG_MODEL_NAME
import torch
from transformers import AutoImageProcessor, ViTModel

def get_image_from_url(img_url):
    response = requests.get(img_url)
    img = Image.open(BytesIO(response.content))
    return img

def get_image_from_fp(img_fp):
    img = Image.open(img_fp)
    return img

VIT_IMAGE_PROCESSOR = AutoImageProcessor.from_pretrained(IMG_MODEL_NAME)
VIT_MODEL = ViTModel.from_pretrained(IMG_MODEL_NAME)

def get_embeddings_from_model(images, image_processor, model):
    inputs = image_processor(images, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    last_hidden_states = outputs.last_hidden_state
    embeddings = last_hidden_states[:, 0].cpu()
    return embeddings

def get_image_vectorizer_for_recommender():
    def image_vectorizer(images):
        embeddings = get_embeddings_from_model(images, VIT_IMAGE_PROCESSOR, VIT_MODEL)
        return embeddings.numpy()
    return image_vectorizer