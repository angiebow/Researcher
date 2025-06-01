from fastapi import FastAPI, Query
from model.recommender import recommend_researchers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/recommend")
def get_recommendations(topic: str = Query(..., description="Input topic to match")):
    results = recommend_researchers(topic)
    return {"topic": topic, "recommendations": results}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)