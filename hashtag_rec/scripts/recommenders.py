from constants import CLIP_MODEL_NAME, LLAVA_MODEL_NAME
import numpy as np
import faiss
import re

from collections import defaultdict
from enum import Enum
from transformers import CLIPModel,CLIPProcessor
from transformers import AutoProcessor, LlavaForConditionalGeneration

class WeightType(Enum):
    FREQUENCY = "frequency"
    FAISS = "faiss_score"
    CLIP = "clip_score"

def get_clip_score_for_tags(tag_list, image, clip_processor, clip_model):
    """
    Get CLIP score for a list of tags compared to a single image

    :param tag_list: list of tags to compute scores for
    :param image: the image to compare each tag in tag_list to
    :param clip_processor: CLIP processor
    :param clip_model: CLIP model

    :return: dict where each entry is tag : clip score
    """
    inputs = clip_processor(text=tag_list, images=image, return_tensors="pt", padding=True)
    outputs = clip_model(**inputs)

    logits_per_image = outputs.logits_per_image[0].cpu().detach().numpy().tolist()
    return dict(zip(tag_list, logits_per_image))

class IndexTagRecommender:
    """
    Class to perform tag recommendation for images, using a faiss index
    """

    def __init__(self, index, idx_mapping, img_tag_list,
                num_rec_tags=5, weight_method=None):
        """
        Initialize the TagRecommender

        :param index: Faiss index to be used for finding similar images
        :param idx_mapping: mapping for vector id in the Faiss index to entity id/metadata
        :param img_tag_list: list of ground truth tags for the images in the Faiss index. 
                             For ImageIndexTagRecommender, assumes that img_tag_list[i] is the list of ground truth tags for image i
                             For TagIndexTagRecommender, assumes that img_tag_list[i] is the tag text/string for tag i
        :param num_rec_tags: the number of desired tags to be recommended for a given image
        :param weight_method: how to weight the results from faiss search for recommendation
        """
        self.index = index
        self.vector_id_to_entity_id_mapping = idx_mapping
        self.img_tag_list = img_tag_list
        self.default_num_rec_tags = num_rec_tags
        self.weight_method = weight_method

        if self.weight_method == WeightType.CLIP:
            self._init_clip_model()

    def _init_clip_model(self):
        print("Loading CLIP model...")
        self.clip_model = CLIPModel.from_pretrained(CLIP_MODEL_NAME)
        self.clip_processor = CLIPProcessor.from_pretrained(CLIP_MODEL_NAME)
        print("Finished loading CLIP model")

    def get_tags_for_image(self, img, img_vectorizer=None, num_tags=None):
        assert img_vectorizer is not None, "No model provided to vectorize images. Please provide an image vectorizer or use get_tags_for_image_vector instead."
        if type(img) is not list:
            img = [img]
        img_vector = img_vectorizer(img)
        if self.weight_method == WeightType.CLIP:
            return self.get_tags_for_image_vector(img_vector, img_bytes=img, num_tags=num_tags)
        return self.get_tags_for_image_vector(img_vector, num_tags=num_tags)

    def get_tags_for_image_vector(self, img_vector, num_tags=None, img_bytes=None):
        if num_tags is None:
            num_tags = self.default_num_rec_tags
        
        img_vector = img_vector.astype(np.float32)
        faiss.normalize_L2(img_vector)
        if len(img_vector.shape) < 2:
            img_vector = np.expand_dims(img_vector, axis=0)
            print("Getting tags for single image. Adding dimension to vector. Resulting vector shape:", img_vector.shape)

        faiss_scores, faiss_idx = self._search_index(img_vector, num_tags)

        rec_tags = self._get_tags_from_faiss_search(faiss_scores, faiss_idx, num_tags, img_bytes=img_bytes)

        return rec_tags

    def _search_index(self, query_vector, num_neighbors):
        scores, indices = self.index.search(query_vector, k=num_neighbors)
        return scores,indices

    def _get_tags_from_faiss_search(self, scores, indices, num_tags, img_bytes=None):
        """
        This method should be implemented in child classes.
        """
        raise NotImplementedError
    
class ImageIndexTagRecommender(IndexTagRecommender):
    """
    Class to perform tag recommendation by querying image embedding against image embeddings
    """

    SUPPORTED_WEIGHT_METHODS = {WeightType.FREQUENCY, WeightType.FAISS, WeightType.CLIP}

    def __init__(self, index, idx_mapping, img_tag_list, 
                 num_rec_tags=5, weight_method="frequency"):
        try:
            weight_method = WeightType(weight_method.lower())
            self.weight_method = weight_method
        except ValueError:
            raise NotImplementedError(f"Weight method {weight_method} is not supported. Please use one of the supported weight methods: {[e.value for e in self.SUPPORTED_WEIGHT_METHODS]}")

        super().__init__(index, idx_mapping, img_tag_list, num_rec_tags=num_rec_tags, weight_method=weight_method)

    
    def _get_tags_from_faiss_search(self, scores, indices, num_tags, img_bytes):
        """
        Override method from parent class
        """
        rec_tags_w_weights = self._get_rec_tags_and_weights(scores, indices, img_bytes)

        rec_tags = [list(rec_tags_dict.keys())[:num_tags] for rec_tags_dict in rec_tags_w_weights]

        return rec_tags
    
    def _get_rec_tags_and_weights(self, scores, indices, img_bytes):
        num_images_to_rec = len(scores)
        rec_tags_list = []

        # iterate through each image we want to recommend tags for
        for i in range(num_images_to_rec):
            score_list_i,idx_list_i = scores[i], indices[i]
            # create new counter of rec tags per image
            recommended_tags_i = defaultdict(lambda : 0)

            # iterate through the similar images
            for score,idx in zip(score_list_i, idx_list_i):
                sim_img_id = self.vector_id_to_entity_id_mapping.get(idx)
                if sim_img_id is None:
                    print("Unable to find image id for vector id:", idx)
                    continue
                sim_img_tags = self.img_tag_list[sim_img_id]

                for tag in sim_img_tags:
                    if self.weight_method == WeightType.FAISS:
                        recommended_tags_i[tag] += score
                    else:
                        recommended_tags_i[tag] += 1

            if self.weight_method == WeightType.CLIP and img_bytes is not None:
                raw_img = img_bytes[i]
                recommended_tags_i = get_clip_score_for_tags(list(recommended_tags_i.keys()), raw_img, self.clip_processor, self.clip_model)
            
            # sort recommended_tags_i dict by weight
            recommended_tags_i = dict(sorted(recommended_tags_i.items(), key=lambda t:t[1], reverse=True))
            rec_tags_list.append(recommended_tags_i)

        return rec_tags_list

class TagIndexTagRecommender(IndexTagRecommender):
    """
    Class to perform tag recommendation by querying image embedding against tag embeddings
    """

    SUPPORTED_WEIGHT_METHODS = {WeightType.FAISS, WeightType.CLIP}

    def __init__(self, index, idx_mapping, img_tag_list, num_rec_tags=5, weight_method="faiss_score"):
        try:
            weight_method = WeightType(weight_method.lower())
            self.weight_method = weight_method
        except ValueError:
            raise NotImplementedError(f"Weight method {weight_method} is not supported. Please use one of the supported weight methods: {[e.value for e in self.SUPPORTED_WEIGHT_METHODS]}")

        super().__init__(index, idx_mapping, img_tag_list, num_rec_tags=num_rec_tags, weight_method=weight_method)
    
    def _get_tags_from_faiss_search(self, scores, indices, num_tags, img_bytes):
        """
        Override method from parent class
        """
        num_images_to_rec = len(scores)
        rec_tags_list = []

        # iterate through each image we want to recommend tags for
        for i in range(num_images_to_rec):
            score_list_i,idx_list_i = scores[i], indices[i]

            # create new counter of rec tags per image
            recommended_tags_i = dict()
            for score,idx in zip(score_list_i, idx_list_i):
                rec_tag_idx = self.vector_id_to_entity_id_mapping[idx]
                rec_tag = self.img_tag_list[rec_tag_idx]
                recommended_tags_i[rec_tag] = score
            
            if self.weight_method == WeightType.CLIP and img_bytes is not None:
                raw_img = img_bytes[i]
                recommended_tags_i = get_clip_score_for_tags(list(recommended_tags_i.keys()), raw_img, self.clip_processor, self.clip_model)

            recommended_tags_i = dict(sorted(recommended_tags_i.items(), key=lambda t:t[1], reverse=True))
            rec_tags_list.append(list(recommended_tags_i.keys())[:num_tags])
        return rec_tags_list

class LlavaTagRecommender:
    """
    Class to perform tag recommendation for images using Llava model
    """

    DEFAULT_LLAVA_PROMPT = "USER: <image>\nWhat are {} hashtags to describe this image? ASSISTANT:"
    TAG_REGEX = r"#([\w]+)"

    def __init__(self, postprocessor=None, num_rec_tags=5, use_clip_scores=False):
        """
        Initialize the Tag Recommender

        :param postprocessor: callable used for custom post-processing of Llava output. If provided, this will be used for post-processing instead of the default post-processing logic
        :param num_rec_tags: the number of desired tags to be recommended for a given image
        :param use_clip_scores: boolean for whether to sort the generated tags by CLIP score
        """
        self._init_llava_model()
        self.postprocessor = postprocessor
        self.default_num_rec_tags = num_rec_tags
        self.use_clip_scores = use_clip_scores
        if self.use_clip_scores:
            self._init_clip_model()
    
    def get_tags_for_image(self, img, model_prompt=None, num_tags=None):
        if num_tags is None:
            num_tags = self.default_num_rec_tags
        if model_prompt is None:
            model_prompt = self.DEFAULT_LLAVA_PROMPT
        model_prompt = model_prompt.format(num_tags)

        generated_llava_text = self._call_llava_model(img, model_prompt, num_new_tokens=5*num_tags)
        
        if self.postprocessor is not None:
            generated_tags = self.postprocessor(generated_llava_text, model_prompt)
        else:
            generated_tags = self._postprocess_llava_text(generated_llava_text, model_prompt)
        
        if self.use_clip_scores:
            tags_w_scores = get_clip_score_for_tags(generated_tags, img, self.clip_processor, self.clip_model)
            generated_tags = list(dict(sorted(tags_w_scores.items(), key=lambda t:t[1], reverse=True)).keys())
        
        rec_tags = generated_tags[:num_tags]
        return rec_tags

    def _init_clip_model(self):
        print("Loading CLIP model...")
        self.clip_model = CLIPModel.from_pretrained(CLIP_MODEL_NAME)
        self.clip_processor = CLIPProcessor.from_pretrained(CLIP_MODEL_NAME)
        print("Finished loading CLIP model")

    def _init_llava_model(self):
        print("Loading llava model...")
        self.llava_processor = AutoProcessor.from_pretrained(LLAVA_MODEL_NAME)
        self.llava_model = LlavaForConditionalGeneration.from_pretrained(LLAVA_MODEL_NAME)
        print("Finished loading llava model")
    
    def _call_llava_model(self, images, prompt, num_new_tokens=5):
        # preprocess images
        inputs = self.llava_processor(text=prompt, images=images, return_tensors="pt")
        # call llava
        generate_ids = self.llava_model.generate(**inputs, max_new_tokens=num_new_tokens)
        generated_text = self.llava_processor.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0]
        return generated_text
    
    def _postprocess_llava_text(self, text, prompt_used):
        generated_new_text = text[len(prompt_used.replace("<image>", " ")) + 1:]
        tag_matches = re.findall(self.TAG_REGEX, generated_new_text)
        return tag_matches
