import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../App.css";

export default function AddMember() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🙂");
  const [isSaving, setIsSaving] = useState(false);

  const addMember = async () => {
    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }

    setIsSaving(true);

    try {
      await addDoc(collection(db, "members"), {
        name: name.trim(),
        emoji: emoji || "🙂",
        stars: 0,
        createdAt: serverTimestamp(),
      });

      alert(`Member "${name}" added successfully!`);
      navigate("/");
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="app-container">
      <h2>＋ Add Member</h2>
      <div className="card">
        <input
          className="name-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="name-input"
          placeholder="Emoji (optional)"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
        <button className="btn" onClick={addMember} disabled={isSaving}>
          {isSaving ? "Adding..." : "Add member"}
        </button>
      </div>
    </div>
  );
}
