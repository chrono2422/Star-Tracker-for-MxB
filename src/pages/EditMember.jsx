import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
    deleteDoc
} from "firebase/firestore";

export default function EditMember() {
  const [members, setMembers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({ name: "", emoji: "" });
  const [loading, setLoading] = useState(true);

  // Load all members
  useEffect(() => {
    const loadMembers = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      setMembers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    loadMembers();
  }, []);

  const handleSelect = (id) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setSelectedId(id);
      setForm({ name: member.name, emoji: member.emoji || "🙂" });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Select a member first.");
    try {
      await updateDoc(doc(db, "members", selectedId), {
        name: form.name.trim(),
        emoji: form.emoji.trim(),
      });
      alert("✅ Member updated!");
    } catch (err) {
      console.error("Error updating:", err);
      alert("Failed to update member. Try again.");
    }
  };

  if (loading) return <p>Loading members...</p>;

  return (
    <div className="app-container">
      <h2>✏️ Edit Member</h2>
      <form onSubmit={handleSave} className="card" style={{ maxWidth: 400 }}>
        <select onChange={(e) => handleSelect(e.target.value)} value={selectedId}>
          <option value="">Select a member...</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.emoji || "🙂"} {m.name}
            </option>
          ))}
        </select>

        {selectedId && (
          <>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Emoji"
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            />
            <button className="btn" type="submit">💾 Save Changes</button>
              <button
  className="btn"
  type="button"
  style={{ background: "#e57373", marginTop: "8px" }}
  onClick={async () => {
    if (!selectedId) return alert("Select a member first.");
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await deleteDoc(doc(db, "members", selectedId));
      alert("🗑️ Member deleted!");
      setMembers(members.filter((m) => m.id !== selectedId));
      setSelectedId("");
      setForm({ name: "", emoji: "" });
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Failed to delete member. Try again.");
    }
  }}
>
  🗑️ Delete Member
</button>
          </>
        )}
      </form>
    </div>
  );
}
