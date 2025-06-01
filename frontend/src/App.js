import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend?topic=${encodeURIComponent(topic)}`
      );
      if (!response.ok) throw new Error("No results");
      const data = await response.json();
      setResults(data.recommendations || []);
    } catch (err) {
      setResults([]);
      alert("No recommendations found or backend error.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Researcher Recommender</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a research topic"
          style={{ width: "70%", padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
          {loading ? "Searching..." : "Recommend"}
        </button>
      </form>
      <div style={{ marginTop: 32 }}>
        {results.length > 0 && (
          <table border="1" cellPadding="8" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Researcher</th>
                <th>Topic</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.ResearcherName || r.researcher_name}</td>
                  <td>{r.TopicName || r.topic}</td>
                  <td>{r.Percentage || r.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;