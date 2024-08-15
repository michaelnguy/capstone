from PIL import Image
import requests
from io import BytesIO
from constants import CLIP_MODEL_NAME, VIT_MODEL_NAME
import torch
from transformers import AutoImageProcessor, ViTModel
from transformers import CLIPModel,CLIPProcessor

def get_image_from_url(img_url):
    """
    Load PIL Image from http url
    """
    response = requests.get(img_url)
    img = Image.open(BytesIO(response.content))
    return img

def get_image_from_fp(img_fp):
    """
    Load PIL Image from file path
    """
    img = Image.open(img_fp)
    return img

def get_vit_embeddings(images, image_processor, model):
    """
    Get image embeddings from a ViT model
    """
    inputs = image_processor(images, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    last_hidden_states = outputs.last_hidden_state
    embeddings = last_hidden_states[:, 0].cpu()
    return embeddings

def get_clip_image_embedding(image, processor, model):
    """
    Get image embeddings from a CLIP model
    """
    image = processor(text=None, images=image, return_tensors="pt")["pixel_values"]
    with torch.no_grad():
        embedding = model.get_image_features(image)
    return embedding

def get_clip_text_embedding(text, processor, model):
    """
    Get text embeddings from a CLIP model
    """
    inputs = processor(text=text, images=None, return_tensors="pt")
    with torch.no_grad():
        embedding = model.get_text_features(**inputs)
    return embedding

def get_image_vectorizer_for_recommender(model_name="clip"):
    """
    Create an image vectorizer that is meant to be used for vectorizing images as input to a IndexTagRecommender

    Available vectorizers: VIT, CLIP
    """
    if model_name.lower() == "vit":
        processor = AutoImageProcessor.from_pretrained(VIT_MODEL_NAME)
        model = ViTModel.from_pretrained(VIT_MODEL_NAME)
        def image_vectorizer(images):
            embeddings = get_vit_embeddings(images, processor, model)
            return embeddings.numpy()
    elif model_name.lower() == "clip":
        processor = CLIPProcessor.from_pretrained(CLIP_MODEL_NAME)
        model = CLIPModel.from_pretrained(CLIP_MODEL_NAME)
        def image_vectorizer(images):
            embeddings = get_clip_image_embedding(images, processor, model)
            return embeddings.numpy()
    else:
        raise NotImplementedError(f"Image Vectorizer {model_name} is not supported for tag recommender")
    return image_vectorizer