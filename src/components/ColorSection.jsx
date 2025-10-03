import React from "react";
import Card from "./Card";
import "../App.css";

export default function ColorSection({
  colorName,
  cards,
  onToggleCard,
  onSelectCard,
  selectedCard,
  assignPoints
}) {
  return (
    <div className="color-section">
      <h3 style={{ textAlign: 'justify' }}> {colorName + " City"}</h3>
      <div className="cards-container" style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
        {cards.map((card, index) => {
          const isSelected =
            selectedCard?.colorName === colorName &&
            selectedCard?.index === index;
          const isDisabled = isSelected || card.removed;
          return (

            <div key={index} style={{ position: 'relative' }}>
              <Card
                value={card.value}
                type={card.type}
                img={card.img}
                removed={card.removed}
                onClick={isDisabled ? undefined : () => onSelectCard(index)}
                onToggleCard={() => onToggleCard(colorName, index)}
                style={{
                  filter: isSelected ? 'grayscale(80%)' : undefined,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  pointerEvents: isDisabled ? 'none' : 'auto', maxWidth: '20%'
                }}
              />

              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderRadius: '8px',
                    color: '#fff',
                    zIndex: 10,
                  }}
                >
                  <button className="playerSelectionBtn"
                    onClick={() => {
                      assignPoints("player1", colorName, card, index);
                      onToggleCard(colorName, index);
                    }}
                  >
                    Player 1
                  </button>
                  <button className="playerSelectionBtn"
                    onClick={() => {
                      assignPoints("player2", colorName, card, index);
                      onToggleCard(colorName, index);
                    }}
                  >
                    Player 2
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
