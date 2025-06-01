import pandas as pd
from sentence_transformers import SentenceTransformer

# Load your CSV
df = pd.read_csv("data/processed_data.csv")

# Load the model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Generate embeddings for each TopicName
df["embedding"] = df["TopicName"].apply(lambda x: model.encode(x).tolist())

# Save the new CSV with embeddings
df.to_csv("data/processed_data.csv", index=False)