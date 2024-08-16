# data constants
DATA_DIR = "./HARRISON" # REPLACE THIS with the directory path that you stored the HARRISON dataset in
DATA_LEN = 57383

# file path constants
INDICES_SPLIT_FILE_NAME = "data_indices_split.json"
IMG_PATHS_FILE_NAME = "data_list.txt"
GT_TAGS_FILE_NAME = "tag_list.txt"
EMBEDDINGS_FILE_NAME = "data_embeddings.txt"

# model constants
CLIP_MODEL_NAME = "openai/clip-vit-base-patch32"
VIT_MODEL_NAME = "google/vit-base-patch16-224-in21k"
LLAVA_MODEL_NAME = "llava-hf/llava-1.5-7b-hf"
ST_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

# df column constants
ID_COL = "img_id"
EMB_COL = "emb"
GT_COL = "gt_tags"
PRED_COL = "pred_tags"

# metric constants
ACCURACY = "acc"
PRECISION = "prec"
RECALL = "rec"
SEMANTIC_SIMILARITY = "sim"