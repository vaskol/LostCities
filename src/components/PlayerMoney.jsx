import React from "react";
import "../App.css";

export default function PlayerMoney({ playerName, money, onChange }) {
  return (
    <div className="player-money">
      <h4>{playerName}</h4>
      <div>
        <button className="minusBtn" onClick={() => onChange(-1)}>-</button>
        <span>{money}</span>
        <button className="plusBtn" onClick={() => onChange(1)}>+</button>
      </div>
    </div>
  );
}
