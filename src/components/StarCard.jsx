import React from "react";

export default function StarCard({ name, stars, onAddStar }) {
  return (
    <div className="star-card">
      <h3>{name}</h3>
      <p>{stars} ⭐</p>
      <button onClick={onAddStar}>Add Star</button>
    </div>
  );
}