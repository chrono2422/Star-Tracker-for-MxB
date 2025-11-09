import React, { useState, useEffect } from "react";
import StarCard from "./StarCard";
import Rewards from "./Rewards";

export default function Tracker() {
  // 🟡 Load saved data from localStorage (or fallback to defaults)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("starTrackerData");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Max", stars: 0 },
          { name: "Ben", stars: 0 },
        ];
  });

  // 🟢 Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("starTrackerData", JSON.stringify(students));
  }, [students]);

  // ⭐ Add a star
  const addStar = (index) => {
    const updated = [...students];
    updated[index].stars += 1;
    setStudents(updated);
  };

  const totalStars = students.reduce((sum, s) => sum + s.stars, 0);

  // 🔄 Optional: Reset button
  const resetStars = () => {
    if (window.confirm("Are you sure you want to reset all stars?")) {
      const reset = students.map((s) => ({ ...s, stars: 0 }));
      setStudents(reset);
      localStorage.removeItem("starTrackerData");
    }
  };

  return (
    <div className="tracker">
      <h1>🌠 Star Tracker for MxB</h1>

      <div className="cards">
        {students.map((student, i) => (
          <StarCard
            key={i}
            name={student.name}
            stars={student.stars}
            onAddStar={() => addStar(i)}
          />
        ))}
      </div>

      <Rewards totalStars={totalStars} />

      <button onClick={resetStars} style={{ marginTop: "20px" }}>
        🔁 Reset All
      </button>
    </div>
  );
}