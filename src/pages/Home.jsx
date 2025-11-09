import { useState, useEffect } from "react";
import "../App.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live Firestore listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "members"), (snapshot) => {
      const data = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => a.name.localeCompare(b.name)); // optional sorting
      setMembers(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Add a star and record history
  const addStar = async (member, activity) => {
    if (!activity || !activity.trim()) {
      alert("Please enter an activity describing the star.");
      return;
    }

    try {
      const memberRef = doc(db, "members", member.id);
      await updateDoc(memberRef, { stars: (member.stars || 0) + 1 });

      await addDoc(collection(db, "history"), {
        type: "star",
        memberName: member.name,
        activity,
        memberId: member.id,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error adding star:", err);
      alert("Failed to update star. Please try again.");
    }
  };

  // Edit member name inline
  const updateName = async (memberId, val) => {
    try {
      const memberRef = doc(db, "members", memberId);
      await updateDoc(memberRef, { name: val.trim() });
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

  // Simple inline add
  const addMember = async () => {
    const name = prompt("Enter new member name:");
    if (!name) return;

    try {
      await addDoc(collection(db, "members"), {
        name: name.trim(),
        emoji: "🙂",
        stars: 0,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  if (loading) return <p>Loading members...</p>;

  return (
    <div className="app-container">
      <h2>🏠 Home — Members</h2>

      <div className="members-list">
        {members.length === 0 && (
          <div className="card">
            <p>No members yet. Click “Add Member” to create one.</p>
          </div>
        )}

        {members.map((m) => (
          <div key={m.id} className="card member-row" style={{ alignItems: "flex-start" }}>
            <div className="avatar">{m.emoji || "🙂"}</div>
            <div className="member-info">
              <input
                className="name-input"
                value={m.name}
                onChange={(e) => updateName(m.id, e.target.value)}
              />
              <div className="stars-row">
                <div className="star-pill">⭐ {m.stars || 0}</div>
                <input
                  placeholder="Activity (e.g. Gym)"
                  className="small-input"
                  id={`act-${m.id}`}
                />
                <button
                  className="btn"
                  onClick={() => {
                    const actInput = document.getElementById(`act-${m.id}`);
                    const activity = actInput.value.trim();
                    addStar(m, activity);
                    actInput.value = "";
                  }}
                >
                  ＋ Star
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="btn" onClick={addMember}>
          ＋ Add Member
        </button>
      </div>
    </div>
  );
}
