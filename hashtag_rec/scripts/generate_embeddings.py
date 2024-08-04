import os
import json
from image_utils import get_image_from_fp
import torch
from transformers import AutoImageProcessor, ViTModel

from constants import DATA_DIR, DATA_LEN, EMB_COL, ID_COL, IMG_MODEL_NAME

image_processor = AutoImageProcessor.from_pretrained(IMG_MODEL_NAME)
model = ViTModel.from_pretrained(IMG_MODEL_NAME)

def get_embeddings_from_model(images, image_processor, model):
    inputs = image_processor(images, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    last_hidden_states = outputs.last_hidden_state
    embeddings = last_hidden_states[:, 0].cpu()
    return embeddings

BATCH_SIZE = 100
batch_is = range(0,DATA_LEN,BATCH_SIZE)
batch_js = range(BATCH_SIZE,DATA_LEN+BATCH_SIZE,BATCH_SIZE)
batches = list(zip(batch_is, batch_js))

with open(os.path.join(DATA_DIR, 'data_embeddings.txt'), 'a') as f:
  for batch_i,batch_j in batches:
    batch_img_fps = img_fps[batch_i:batch_j]
    batch_imgs = [get_image_from_fp(os.path.join(DATA_DIR, fp)) for fp in batch_img_fps]
    batch_embs = get_embeddings_from_model(batch_imgs, image_processor, model)

    for emb_i,img_i in enumerate(range(batch_i,batch_j)):
      json.dump({ID_COL: img_i, EMB_COL: batch_embs[emb_i].numpy().tolist()}, f)
      f.write(os.linesep)

    if batch_j % 1000 == 0:
      print("Finished up to image ", batch_j, "\n")