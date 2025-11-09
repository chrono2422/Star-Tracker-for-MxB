import { useState } from "react";
import "./App.css";

function App() {
  const [members, setMembers] = useState([
    { id: 1, name: "MxB Member 1", stars: 3, rewards: ["Badge A"] },
    { id: 2, name: "MxB Member 2", stars: 5, rewards: ["Badge B", "Gift Card"] },
  ]);

  const updateName = (id, newName) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: newName } : m))
    );
  };

  const addStar = (id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, stars: m.stars + 1 } : m
      )
    );
  };

  const addReward = (id) => {
    const newReward = prompt("Enter new reward name:");
    if (!newReward) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, rewards: [...m.rewards, newReward] } : m
      )
    );
  };

  const editReward = (id, index) => {
    const newName = prompt("Edit reward name:");
    if (!newName) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              rewards: m.rewards.map((r, i) =>
                i === index ? newName : r
              ),
            }
          : m
      )
    );
  };

  const deleteReward = (id, index) => {
    if (!confirm("Remove this reward?")) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, rewards: m.rewards.filter((_, i) => i !== index) }
          : m
      )
    );
  };

  return (
    <div className="app-container">
      <h1>🌟 Star Tracker for MxB</h1>
      <div className="members-container">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <input
              type="text"
              value={member.name}
              onChange={(e) => updateName(member.id, e.target.value)}
              className="name-input"
            />
            <p>⭐ Stars: {member.stars}</p>
            <button onClick={() => addStar(member.id)}>+ Add Star</button>

            <div className="rewards">
              <h4>🎁 Rewards:</h4>
              <ul>
                {member.rewards.map((r, i) => (
                  <li key={i} className="reward-item">
                    <span>{r}</span>
                    <div className="reward-actions">
                      <button onClick={() => editReward(member.id, i)}>✏️</button>
                      <button onClick={() => deleteReward(member.id, i)}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={() => addReward(member.id)}>+ Add Reward</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;