import React from "react";

export default function Rewards({ totalStars }) {
  let reward = "⭐ Keep going!";
  if (totalStars >= 50) reward = "🎉 Super Star!";
  else if (totalStars >= 30) reward = "🌟 Amazing Progress!";
  else if (totalStars >= 10) reward = "💫 Great Job!";

  return (
    <div className="rewards">
      <h2>Rewards</h2>
      <p>{reward}</p>
    </div>
  );
}