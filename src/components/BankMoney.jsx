import React from "react";
import "../App.css";

export default function BankMoney({ name, bankMoney, onChange }) {
  return (
    <div className="bank-money">
      <h4>{name}</h4>
      <div>
        <span>{bankMoney}</span>
      </div>
    </div>
  );
}
