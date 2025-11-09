import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AddMember() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🙂");
  const [members, setMembers] = useState(() => JSON.parse(localStorage.getItem("members") || "[]"));

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const add = () => {
    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }
    const newMember = { name: name.trim(), emoji: emoji || "🙂", stars: 0 };
    const updated = [...members, newMember];
    setMembers(updated);
    // persist
    localStorage.setItem("members", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div className="app-container">
      <h2>＋ Add Member</h2>
      <div className="card">
        <input className="name-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="name-input" placeholder="Emoji (optional)" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
        <button className="btn" onClick={add}>Add member</button>
      </div>
    </div>
  );
}
