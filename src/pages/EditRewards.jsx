import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function EditRewards() {
  const [rewards, setRewards] = useState([]);
  const [name, setName] = useState("");
  const [starsRequired, setStarsRequired] = useState("");

  // listen live to Firestore changes
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rewards"), (snap) => {
      setRewards(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const add = async () => {
    if (!name.trim() || !starsRequired)
      return alert("Provide name and stars required");

    try {
      await addDoc(collection(db, "rewards"), {
        name: name.trim(),
        starsRequired: Number(starsRequired),
        createdAt: new Date().toISOString(),
      });
      setName("");
      setStarsRequired("");
    } catch (err) {
      console.error("Error adding reward:", err);
      alert("Something went wrong while adding reward.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this reward?")) return;
    try {
      await deleteDoc(doc(db, "rewards", id));
    } catch (err) {
      console.error("Error deleting reward:", err);
    }
  };

  const edit = async (id, currentName) => {
    const newName = prompt("Edit reward name:", currentName);
    if (!newName || !newName.trim()) return;
    try {
      await updateDoc(doc(db, "rewards", id), { name: newName.trim() });
    } catch (err) {
      console.error("Error updating reward:", err);
    }
  };

  return (
    <div className="app-container">
      <h2>🛠 Edit Rewards</h2>

      <div className="card">
        <input
          className="name-input"
          placeholder="Reward name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="name-input"
          placeholder="Stars required (number)"
          type="number"
          value={starsRequired}
          onChange={(e) => setStarsRequired(e.target.value)}
        />
        <button className="btn" onClick={add}>
          ＋ Add Reward
        </button>
      </div>

      {rewards.length > 0 && (
        <div className="card">
          {rewards.map((r) => (
            <div key={r.id} className="reward-row">
              <div style={{ flex: 1 }}>
                <strong>{r.name}</strong>
                <div style={{ color: "var(--muted)", fontSize: ".95rem" }}>
                  ⭐ {r.starsRequired}
                </div>
              </div>
              <div className="reward-actions">
                <button className="btn-ghost" onClick={() => edit(r.id, r.name)}>
                  ✏️
                </button>
                <button className="btn-ghost" onClick={() => remove(r.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Link to="/rewards" className="nav-link">
          ← Back to View Rewards
        </Link>
      </div>
    </div>
  );
}
