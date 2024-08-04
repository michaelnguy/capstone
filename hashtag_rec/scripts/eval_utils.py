from constants import ACCURACY, GT_COL, PRECISION, PRED_COL, RECALL
import numpy as np

def calculate_eval_metrics(gt_tags, pred_tags):
    """
    Calculate evaluation metrics accuracy, precision, and recall for a single image's tags

    :param gt_tags: list of ground truth tags
    :param pred_tags: list of recommmended tags

    :return: 3-len tuple of (accuracy, precision, recall)
    """
    correct_pred_tags = set(gt_tags).intersection(set(pred_tags))
    num_correct = len(correct_pred_tags)
    acc = int(num_correct > 0)
    prec = num_correct / len(pred_tags)
    rec = num_correct / len(gt_tags)
    return acc,prec,rec

def evaluate_recommendations(pred_df, K=np.arange(5)+1, ret_dict=False):
    """
    Calculate evaluation metrics accuracy@K, precision@K, and recall@K for the given dataset

    :param pred_df: pandas DataFrame containing ground truth tags and recommended tags for each image in the dataset
    :param K: iterable of k-values to calculate the evaluation metrics @ k for
    :param ret_dict: whether to return dict of image-wise evaluation metrics

    :return: dict of evaluation metrics

    Ex:
    {
        "acc": {
            1 : acc@1,
            2: acc@2,
            ...
        },
        "prec": {
            k: prec@k
        }
        "rec": {
            k: rec@k
        }
    }
    """
    # make sure all k-values are int
    K = [int(k) for k in K]
    acc = {k: [] for k in K}
    prec = {k: [] for k in K}
    rec = {k: [] for k in K}
    eval_dict = {ACCURACY: acc, PRECISION: prec, RECALL: rec}

    for i,row in pred_df.iterrows():
        gt_tags = row[GT_COL]
        pred_tags = row[PRED_COL]

        for k in K:
            img_acc,img_prec,img_rec = calculate_eval_metrics(gt_tags, pred_tags[:k])
            acc[k].append(img_acc)
            prec[k].append(img_prec)
            rec[k].append(img_rec)

    eval_metrics = {}
    for metric_name, metric_k_dict in eval_dict.items():
        eval_metrics[metric_name] = {k:np.mean(v) for k,v in metric_k_dict.items()}

    return (eval_metrics,eval_dict) if ret_dict else eval_metrics
