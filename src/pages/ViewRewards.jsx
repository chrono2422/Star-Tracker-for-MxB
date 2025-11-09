import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import {
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";

export default function ViewRewards() {
  const [rewards, setRewards] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Realtime Firestore listeners
  useEffect(() => {
    const unsubMembers = onSnapshot(collection(db, "members"), (snap) => {
      setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubRewards = onSnapshot(collection(db, "rewards"), (snap) => {
      setRewards(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => {
      unsubMembers();
      unsubRewards();
    };
  }, []);

  const claim = async (reward, memberId) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) {
      Swal.fire("Oops!", "Please choose a member first.", "warning");
      return;
    }

    if ((member.stars || 0) < reward.starsRequired) {
      Swal.fire("Not enough stars!", "You need more stars to claim this reward.", "error");
      return;
    }

    try {
      const memberRef = doc(db, "members", member.id);
      const memberHistoryRef = collection(db, "members", member.id, "history");
      const globalHistoryRef = collection(db, "history");

      // Deduct stars
      await updateDoc(memberRef, {
        stars: (member.stars || 0) - reward.starsRequired,
      });

      // Add to member-specific history
      await addDoc(memberHistoryRef, {
        type: "claimed",
        rewardName: reward.name,
        points: reward.starsRequired,
        createdAt: serverTimestamp(),
      });

      // Add to global history (optional)
      await addDoc(globalHistoryRef, {
        type: "claimed",
        memberName: member.name,
        rewardName: reward.name,
        memberId: member.id,
        rewardId: reward.id,
        timestamp: serverTimestamp(),
      });

      // Sweet success popup
      Swal.fire({
        title: "🎉 Reward Claimed!",
        html: `<b>${member.name}</b> successfully claimed <b>${reward.name}</b>!`,
        icon: "success",
        confirmButtonText: "Yay!",
        background: "#fffaf5",
      });
    } catch (err) {
      console.error("Error claiming reward:", err);
      Swal.fire("Error", "Something went wrong while claiming the reward.", "error");
    }
  };

  if (loading) return <p>Loading rewards...</p>;

  return (
    <div className="app-container">
      <h2>🎁 View Rewards</h2>

      {rewards.length === 0 && (
        <div className="card">
          <p>No rewards yet. Click Edit Rewards to add one.</p>
        </div>
      )}

      {rewards.map((r, i) => (
        <div key={r.id || i} className="card reward-row">
          <div style={{ flex: 1 }}>
            <strong>{r.name}</strong>
            <div style={{ color: "var(--muted)", fontSize: ".95rem" }}>
              Requires ⭐ {r.starsRequired}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
            <select className="small-input" id={`sel-${i}`}>
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <button
              className="btn"
              onClick={() => {
                const sel = document.getElementById(`sel-${i}`).value;
                if (sel === "") {
                  Swal.fire("Choose a member first", "", "info");
                  return;
                }
                claim(r, sel);
              }}
            >
              Claim
            </button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        <Link to="/edit-rewards" className="nav-link">
          ✏️ Edit Rewards
        </Link>
      </div>
    </div>
  );
}
