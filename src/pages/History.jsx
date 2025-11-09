import "../App.css";

export default function History() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  if(history.length === 0) {
    return (
      <div className="app-container">
        <h2>🕓 History</h2>
        <div className="card"><p>No actions recorded yet.</p></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2>🕓 History</h2>
      <div className="history-list">
        {history.map((h,idx) => (
          <div key={idx} className="history-item">
            {h.type === "star" && (
              <div>
                <strong>{h.memberName}</strong> earned a star for <em>{h.activity}</em><br />
                <small>{new Date(h.timestamp).toLocaleString()}</small>
              </div>
            )}
            {h.type === "claim" && (
              <div>
                <strong>{h.memberName}</strong> claimed <em>{h.rewardName}</em><br />
                <small>{new Date(h.timestamp).toLocaleString()}</small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
