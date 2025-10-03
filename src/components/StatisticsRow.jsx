import { useState, useEffect } from "react";

export default function StatisticsRow({ playerName, points = [], multipliers = [], bankPoints = 0 }) {
  const colors = ["Red", "Blue", "Green", "Yellow", "White"];

  const effectivePointsPerColor = points.map((point, i) =>
    point > 0 ? point * ((multipliers[i] + 1 || 0)) : 0
  );

  // Total points including bank
  const totalPoints = effectivePointsPerColor.reduce((sum, val) => sum + val, 0) + bankPoints;
  const sumPoints = effectivePointsPerColor.reduce((sum, val) => sum + val, 0);
  return (
    <div style={{ borderRadius: "5px", width: "250px" }}>
      <h4>{playerName}</h4>

      <div style={{ marginBottom: "0.5rem" }}>
        {colors.map((color, i) => (
          <div key={color} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{color}</span>
            <span>
              {points[i] || 0} × <b>{(multipliers[i] + 1 || 0)} </b>= {effectivePointsPerColor[i]}
            </span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'left' }}>Points: {sumPoints} </p>
      <p style={{ textAlign: 'left' }}>Coins: {bankPoints}</p>

      <p style={{ textAlign: 'right' }}><strong>Total: {totalPoints}</strong></p>
    </div>
  );
}
