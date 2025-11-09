import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function EditRewards() {
  const [rewards, setRewards] = useState(() => JSON.parse(localStorage.getItem("rewards") || "[]"));
  const [name, setName] = useState("");
  const [starsRequired, setStarsRequired] = useState("");

  useEffect(() => {
    localStorage.setItem("rewards", JSON.stringify(rewards));
  }, [rewards]);

  const add = () => {
    if (!name.trim() || !starsRequired) return alert("Provide name and stars required");
    const updated = [...rewards, { name: name.trim(), starsRequired: Number(starsRequired) }];
    setRewards(updated);
    setName(""); setStarsRequired("");
  };

  const remove = (i) => {
    if (!confirm("Delete this reward?")) return;
    const updated = rewards.filter((_, idx)=> idx !== i);
    setRewards(updated);
  };

  return (
    <div className="app-container">
      <h2>🛠 Edit Rewards</h2>

      <div className="card">
        <input className="name-input" placeholder="Reward name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="name-input" placeholder="Stars required (number)" type="number" value={starsRequired} onChange={(e)=>setStarsRequired(e.target.value)} />
        <button className="btn" onClick={add}>＋ Add Reward</button>
      </div>

      {rewards.length > 0 && <div className="card">
        {rewards.map((r,i)=> (
          <div key={i} className="reward-row">
            <div style={{flex:1}}>
              <strong>{r.name}</strong>
              <div style={{color:"var(--muted)", fontSize:".95rem"}}>⭐ {r.starsRequired}</div>
            </div>
            <div className="reward-actions">
              <button className="btn-ghost" onClick={()=> {
                const newName = prompt("Edit reward name:", r.name);
                if(newName) {
                  const updated = [...rewards]; updated[i].name = newName; setRewards(updated);
                }
              }}>✏️</button>
              <button className="btn-ghost" onClick={()=>remove(i)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>}

      <div style={{marginTop:12}}>
        <Link to="/rewards" className="nav-link">← Back to View Rewards</Link>
      </div>
    </div>
  );
}
