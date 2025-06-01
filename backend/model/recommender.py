import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch
import ast

model = SentenceTransformer("all-MiniLM-L6-v2")

df = pd.read_csv("data/processed_data.csv")

df["embedding"] = df["embedding"].apply(ast.literal_eval)

def recommend_researchers(topic, top_k=5):
    topic_emb = model.encode(topic, convert_to_tensor=True)
    topic_emb = topic_emb.cpu()
    embeddings = torch.tensor(df["embedding"].tolist()).cpu()
    sims = util.cos_sim(topic_emb, embeddings)[0]
    top_indices = sims.topk(top_k).indices.tolist()
    print(df.columns)  
    return df.iloc[top_indices][["ResearcherName", "TopicName", "Percentage"]].to_dict(orient="records")