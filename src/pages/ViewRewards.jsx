import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function ViewRewards() {
  const [rewards, setRewards] = useState(() => JSON.parse(localStorage.getItem("rewards") || "[]"));
  const [members, setMembers] = useState(() => JSON.parse(localStorage.getItem("members") || "[]"));

  useEffect(() => {
    localStorage.setItem("rewards", JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const claim = (rewardIndex, memberIndex) => {
    const reward = rewards[rewardIndex];
    const updatedMembers = [...members];
    if (!updatedMembers[memberIndex]) {
      alert("Please choose a member to claim.");
      return;
    }
    if ((updatedMembers[memberIndex].stars || 0) >= reward.starsRequired) {
      updatedMembers[memberIndex].stars -= reward.starsRequired;
      setMembers(updatedMembers);
      // add history
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.unshift({
        type: "claim",
        memberName: updatedMembers[memberIndex].name,
        rewardName: reward.name,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("history", JSON.stringify(history));
      alert(`${updatedMembers[memberIndex].name} claimed ${reward.name}!`);
    } else {
      alert("Not enough stars.");
    }
  };

  return (
    <div className="app-container">
      <h2>🎁 View Rewards</h2>
      {rewards.length === 0 && <div className="card"><p>No rewards yet. Click Edit Rewards to add.</p></div>}

      {rewards.map((r, i) => (
        <div key={i} className="card reward-row">
          <div style={{flex:1}}>
            <strong>{r.name}</strong>
            <div style={{color:"var(--muted)", fontSize:".95rem"}}>Requires ⭐ {r.starsRequired}</div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"8px",alignItems:"flex-end"}}>
            <select className="small-input" id={`sel-${i}`}>
              <option value="">Select member</option>
              {members.map((m,mi)=> (<option key={mi} value={mi}>{m.name}</option>))}
            </select>
            <button className="btn" onClick={()=>{
              const sel = document.getElementById(`sel-${i}`).value;
              if(sel === "") { alert("Choose a member first"); return; }
              claim(i, Number(sel));
            }}>Claim</button>
          </div>
        </div>
      ))}

      <div style={{marginTop:12}}>
        <Link to="/edit-rewards" className="nav-link">Edit Rewards</Link>
      </div>
    </div>
  );
}
