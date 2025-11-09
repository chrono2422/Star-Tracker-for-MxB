import { useState, useEffect } from "react";
import "../App.css";

export default function Home() {
  const [members, setMembers] = useState(() => JSON.parse(localStorage.getItem("members") || "[]"));

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const addStar = (index, activity) => {
    if (!activity || activity.trim() === "") {
      alert("Please enter an activity describing the star.");
      return;
    }
    const updated = [...members];
    updated[index].stars = (updated[index].stars || 0) + 1;
    // push to history
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.unshift({
      type: "star",
      memberName: updated[index].name,
      activity,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("history", JSON.stringify(history));
    setMembers(updated);
  };

  const updateName = (idx, val) => {
    const updated = [...members];
    updated[idx].name = val;
    setMembers(updated);
  };

  return (
    <div className="app-container">
      <h2>Home — Members</h2>

      <div className="members-list">
        {members.length === 0 && (
          <div className="card">
            <p>No members yet. Click “Add Member” to create one.</p>
          </div>
        )}

        {members.map((m, i) => (
          <div key={i} className="card member-row" style={{ alignItems: "flex-start" }}>
            <div className="avatar">{m.emoji || "🙂"}</div>
            <div className="member-info">
              <input className="name-input" value={m.name} onChange={(e) => updateName(i, e.target.value)} />
              <div className="stars-row">
                <div className="star-pill">⭐ {m.stars || 0}</div>
                <input placeholder="Activity (e.g. Gym)" className="small-input" id={`act-${i}`} />
                <button className="btn" onClick={() => {
                  const activity = document.getElementById(`act-${i}`).value;
                  addStar(i, activity);
                  document.getElementById(`act-${i}`).value = "";
                }}>＋ Star</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
