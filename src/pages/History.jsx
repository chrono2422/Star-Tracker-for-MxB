import { useState, useEffect } from "react";
import "../App.css";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "history"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setHistory(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>Loading history...</p>;

  if (history.length === 0) {
    return (
      <div className="app-container">
        <h2>🕓 History</h2>
        <div className="card">
          <p>No actions recorded yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2>🕓 History</h2>

      <div className="history-list" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {history.map((h) => {
          const timeString = h.timestamp?.toDate
            ? h.timestamp.toDate().toLocaleString()
            : h.timestamp
            ? new Date(h.timestamp).toLocaleString()
            : "Unknown time";

          // Custom icons and colors for each history type
          let icon = "⭐";
          let actionText = "";
          let color = "var(--text)";
          if (h.type === "star") {
            icon = "🌟";
            actionText = (
              <>
                <strong>{h.memberName}</strong> earned a star for{" "}
                <em>{h.activity}</em>
              </>
            );
            color = "var(--success, #3bb33b)";
          } else if (h.type === "claim" || h.type === "claimed") {
            icon = "🎁";
            actionText = (
              <>
                <strong>{h.memberName}</strong> claimed{" "}
                <em>{h.rewardName}</em>
              </>
            );
            color = "var(--accent, #ff7b7b)";
          }

          return (
            <div
              key={h.id}
              className="card history-item"
              style={{
                display: "flex",
                flexDirection: "column",
                borderLeft: `5px solid ${color}`,
                backgroundColor: "#fffaf7",
              }}
            >
              <div style={{ fontSize: "1.1rem" }}>
                {icon} {actionText}
              </div>
              <small style={{ color: "var(--muted)", marginTop: "4px" }}>
                {timeString}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
