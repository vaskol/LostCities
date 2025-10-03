import React, { useState, useEffect } from "react";
import ColorSection from "./components/ColorSection";
import PlayerMoney from "./components/PlayerMoney";
import BankMoney from "./components/BankMoney";
import StatisticsRow from "./components/StatisticsRow";
import "./App.css";

import lostCitiesLogo from './assets/lostCitiesLogo.png';
import bankBanner from './assets/bank.png';

// // 🔴 Red
import redMultiplierImg from './assets/Red/red_Multiplier.png';
import redNumber2 from './assets/Red/red_Number_2.png';
import redNumber3 from './assets/Red/red_Number_3.png';
import redNumber4 from './assets/Red/red_Number_4.png';
import redNumber5 from './assets/Red/red_Number_5.png';
import redNumber6 from './assets/Red/red_Number_6.png';
import redNumber7 from './assets/Red/red_Number_7.png';
import redNumber8 from './assets/Red/red_Number_8.png';
import redNumber9 from './assets/Red/red_Number_9.png';
import redNumber10 from './assets/Red/red_Number_10.png';

// 🔵 Blue
import blueMultiplierImg from './assets/Blue/blue_Multiplier.png';
import blueNumber2 from './assets/Blue/blue_Number_2.png';
import blueNumber3 from './assets/Blue/blue_Number_3.png';
import blueNumber4 from './assets/Blue/blue_Number_4.png';
import blueNumber5 from './assets/Blue/blue_Number_5.png';
import blueNumber6 from './assets/Blue/blue_Number_6.png';
import blueNumber7 from './assets/Blue/blue_Number_7.png';
import blueNumber8 from './assets/Blue/blue_Number_8.png';
import blueNumber9 from './assets/Blue/blue_Number_9.png';
import blueNumber10 from './assets/Blue/blue_Number_10.png';

// // 🟢 Green
import greenMultiplierImg from './assets/Green/green_Multiplier.png';
import greenNumber2 from './assets/Green/green_Number_2.png';
import greenNumber3 from './assets/Green/green_Number_3.png';
import greenNumber4 from './assets/Green/green_Number_4.png';
import greenNumber5 from './assets/Green/green_Number_5.png';
import greenNumber6 from './assets/Green/green_Number_6.png';
import greenNumber7 from './assets/Green/green_Number_7.png';
import greenNumber8 from './assets/Green/green_Number_8.png';
import greenNumber9 from './assets/Green/green_Number_9.png';
import greenNumber10 from './assets/Green/green_Number_10.png';

// // 🟡 Yellow

import yellowMultiplierImg from './assets/Yellow/yellow_Multiplier.png';
import yellowNumber2 from './assets/Yellow/yellow_Number_2.png';
import yellowNumber3 from './assets/Yellow/yellow_Number_3.png';
import yellowNumber4 from './assets/Yellow/yellow_Number_4.png';
import yellowNumber5 from './assets/Yellow/yellow_Number_5.png';
import yellowNumber6 from './assets/Yellow/yellow_Number_6.png';
import yellowNumber7 from './assets/Yellow/yellow_Number_7.png';
import yellowNumber8 from './assets/Yellow/yellow_Number_8.png';
import yellowNumber9 from './assets/Yellow/yellow_Number_9.png';
//import yellowNumber10 from './assets/Yellow/yellow_Number_10.png';

// // ⚪ White
import whiteMultiplierImg from './assets/White/white_Multiplier.png';
import whiteNumber2 from './assets/White/white_Number_2.png';
import whiteNumber3 from './assets/White/white_Number_3.png';
import whiteNumber4 from './assets/White/white_Number_4.png';
import whiteNumber5 from './assets/White/white_Number_5.png';
import whiteNumber6 from './assets/White/white_Number_6.png';
import whiteNumber7 from './assets/White/white_Number_7.png';
import whiteNumber8 from './assets/White/white_Number_8.png';
import whiteNumber9 from './assets/White/white_Number_9.png';
import whiteNumber10 from './assets/White/white_Number_10.png';
const TOTAL_COIN_LIMIT = 36;


export default function App() {
  const createCards = (color) => [
    // multipliers
    ...Array.from({ length: 5 }, () => ({
      value: "m",
      type: "multiplier",
      removed: false,
      img: multiplierImages[color],
    })),

    // numbers 2–5 (two copies each)
    ...[2, 3, 4, 5].flatMap(num => ([
      { value: num.toString(), type: "number", removed: false, img: numberImages[num][color] },
      { value: num.toString(), type: "number", removed: false, img: numberImages[num][color] },
    ])),

    // numbers 6–10 (one copy each)
    ...Array.from({ length: 5 }, (_, i) => {
      const num = i + 6;
      return {
        value: num.toString(),
        type: "number",
        removed: false,
        img: numberImages[num][color],
      };
    }),
  ];


  const multiplierImages = {
    Red: redMultiplierImg,
    Blue: blueMultiplierImg,
    Green: greenMultiplierImg,
    Yellow: yellowMultiplierImg,
    White: whiteMultiplierImg,
  };

  const numberImages = {
    2: { Red: redNumber2, Blue: blueNumber2, Green: greenNumber2, Yellow: yellowNumber2, White: whiteNumber2 },
    3: { Red: redNumber3, Blue: blueNumber3, Green: greenNumber3, Yellow: yellowNumber3, White: whiteNumber3 },
    4: { Red: redNumber4, Blue: blueNumber4, Green: greenNumber4, Yellow: yellowNumber4, White: whiteNumber4 },
    5: { Red: redNumber5, Blue: blueNumber5, Green: greenNumber5, Yellow: yellowNumber5, White: whiteNumber5 },
    6: { Red: redNumber6, Blue: blueNumber6, Green: greenNumber6, Yellow: yellowNumber6, White: whiteNumber6 },
    7: { Red: redNumber7, Blue: blueNumber7, Green: greenNumber7, Yellow: yellowNumber7, White: whiteNumber7 },
    8: { Red: redNumber8, Blue: blueNumber8, Green: greenNumber8, Yellow: yellowNumber8, White: whiteNumber8 },
    9: { Red: redNumber9, Blue: blueNumber9, Green: greenNumber9, Yellow: yellowNumber9, White: whiteNumber9 },
    10:{ Red: redNumber10, Blue: blueNumber10, Green: greenNumber10, Yellow: yellowNumber2, White: whiteNumber10 },
  };
  const initialColors = {
    Red: createCards("Red"),
    Blue: createCards("Blue"),
    Green: createCards("Green"),
    Yellow: createCards("Yellow"),
    White: createCards("White"),
  };

  const loadState = () => {
    const saved = localStorage.getItem("lostCitiesState");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          colors: initialColors,
          history: [],
          player1Money: 18,
          player2Money: 18,
          bankMoney: 0,
          player1Points: [0, 0, 0, 0, 0],
          player2Points: [0, 0, 0, 0, 0],
          player1Multipliers: [0, 0, 0, 0, 0],
          player2Multipliers: [0, 0, 0, 0, 0]
        };
      }
    }
    return {
      colors: initialColors,
      history: [],
      player1Money: 18,
      player2Money: 18,
      bankMoney: 0,
      player1Points: [0, 0, 0, 0, 0],
      player2Points: [0, 0, 0, 0, 0],
      player1Multipliers: [0, 0, 0, 0, 0],
      player2Multipliers: [0, 0, 0, 0, 0]
    };
  };

  const [colors, setColors] = useState(loadState().colors);
  const [history, setHistory] = useState(loadState().history);
  const [player1Money, setPlayer1Money] = useState(loadState().player1Money);
  const [player2Money, setPlayer2Money] = useState(loadState().player2Money);
  const [bankMoney, setBankMoney] = useState(loadState().bankMoney);

  const [player1Points, setPlayer1Points] = useState(loadState().player1Points);
  const [player2Points, setPlayer2Points] = useState(loadState().player2Points);

  const [player1Multipliers, setPlayer1Multipliers] =useState(loadState().player1Multipliers);
  const [player2Multipliers, setPlayer2Multipliers] =useState(loadState().player2Multipliers);

  const [selectedCard, setSelectedCard] = useState(null);
  const colorsAssigned = ["Red", "Blue", "Green", "Yellow", "White"];


  useEffect(() => {
    localStorage.setItem(
      "lostCitiesState",
      JSON.stringify({ colors, history, player1Money, player2Money, bankMoney, player1Points, player2Points, player1Multipliers, player2Multipliers })
    );
  }, [colors, history, player1Money, player2Money, bankMoney, player1Points, player2Points, player1Multipliers, player2Multipliers]);


  const toggleCard = (colorName, index) => {
    setColors((prev) => {
      const newColors = { ...prev };
      const card = { ...newColors[colorName][index] };
      card.removed = !card.removed;
      newColors[colorName] = [
        ...newColors[colorName].slice(0, index),
        card,
        ...newColors[colorName].slice(index + 1),
      ];
      return newColors;
    });
  };

  const assignPoints = (player, colorName, card, index) => {
    const colorIndex = colorsAssigned.indexOf(colorName);
    if (colorIndex === -1) return; 
    if (player !== "player1" && player !== "player2") return; 

    if (card.type === "multiplier") {
      switch (colorName) {
        case "Red":
        case "Blue":
        case "Green":
        case "Yellow":
        case "White":
          if (player === "player1") {
            setPlayer1Multipliers((prev) => {
              const newMultipliers = [...prev];
              newMultipliers[colorIndex] += 1;
              return newMultipliers;
            });
          } else {
            setPlayer2Multipliers((prev) => {
              const newMultipliers = [...prev];
              newMultipliers[colorIndex] += 1;
              return newMultipliers;
            });
          }
          break;
        default:
          break;
      }
    } else if (card.type === "number") {
      let pointsToAdd = 0;
      const val = Number(card.value);
      if (val >= 2 && val <= 5) pointsToAdd = 1;
      else if (val >= 6 && val <= 10) pointsToAdd = 2;

      if (player === "player1") {
        setPlayer1Points((prev) => {
          const newPoints = [...prev];
          newPoints[colorIndex] += pointsToAdd;
          return newPoints;
        });
      } else {
        setPlayer2Points((prev) => {
          const newPoints = [...prev];
          newPoints[colorIndex] += pointsToAdd;
          return newPoints;
        });
      }
    }

    debugger;
    setHistory((prev) => [
      ...prev,
      {
        colorName,
        index,
        player1Multipliers,
        player2Multipliers,
        bankMoney,
        player1Money,
        player2Money,
        player,
        points: card.type === "number"
          ? (Number(card.value) >= 2 && Number(card.value) <= 5
            ? 1
            : Number(card.value) >= 6 && Number(card.value) <= 10
              ? 2
              : 0)
          : 0
      }
    ]);

    // reset selection after assigning points
    setSelectedCard(null);
  };

  useEffect(() => {
    console.log("History updated:", history);
  }, [history]);


  const undoLast = () => {
    if (history.length === 0) return;
    console.log(history);
    const last = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    // Restore the card state
    if (last.colorName !== undefined && last.index !== undefined) {
      setColors(prev => {
        const newColors = { ...prev };
        const card = { ...newColors[last.colorName][last.index] };
        card.removed = !card.removed;
        newColors[last.colorName] = [
          ...newColors[last.colorName].slice(0, last.index),
          card,
          ...newColors[last.colorName].slice(last.index + 1),
        ];
        return newColors;
      });


      // Restore points
      const colorIndex = colorsAssigned.indexOf(last.colorName);
      if (colorIndex !== -1) {
        if (last.player === "player1") {
          setPlayer1Points(prev => {
            const newPoints = [...prev];
            newPoints[colorIndex] -= last.points;
            return newPoints;
          });
        }
        if (last.player === "player2") {
          setPlayer2Points(prev => {
            const newPoints = [...prev];
            newPoints[colorIndex] -= last.points;
            return newPoints;
          });
        }
      }
    }

    //Restore multipliers
    if (last.player1Multipliers !== undefined) {
      setPlayer1Multipliers(last.player1Multipliers);
    }
    if (last.player2Multipliers !== undefined) {
      setPlayer2Multipliers(last.player2Multipliers);
    }
    // Restore money
    setPlayer1Money(prev => (last?.player1Money ?? prev));
    setPlayer2Money(prev => (last?.player2Money ?? prev));
    setBankMoney(prev => (last?.bankMoney ?? prev));


  };

  const resetGame = () => {
    setColors(initialColors);
    setHistory([]);
    //money
    setPlayer1Money(18);
    setPlayer2Money(18);
    setBankMoney(0);
    //points
    setPlayer1Points([0, 0, 0, 0, 0]);
    setPlayer2Points([0, 0, 0, 0, 0]);
    setPlayer1Multipliers([0, 0, 0, 0, 0]);
    setPlayer2Multipliers([0, 0, 0, 0, 0]);
  };

  return (
    <div className="app">
      <img
        src={lostCitiesLogo}
        alt="Lost Cities"
        style={{
          display: 'flex',
          maxHeight: '200px',
          minWidth: '10%',
          placeSelf: 'center',
        }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <div className="statistics-card">
          <StatisticsRow
            playerName="Player 1"
            points={player1Points}
            multipliers={player1Multipliers}
            bankPoints={player1Money}
          />
        </div>
        <div className="statistics-card">
          <StatisticsRow
            playerName="Player 2"
            points={player2Points}
            multipliers={player2Multipliers}
            bankPoints={player2Money}
          />
        </div>
      </div>
      <div className="playerContainer" 
      style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', borderRadius: '30px',boxShadow: '5px 5px 50px 0.01px;',//backgroundImage: `url(${bankBanner})`
        backgroundSize: "cover",     // or "contain"
        backgroundPosition: "center", }}>
        <PlayerMoney
          playerName="Player 1"
          money={player1Money}
          onChange={(amount) => {
            if (amount < 0) {
              const loss = Math.min(player1Money, -amount);
              setPlayer1Money(m => m - loss);
              setBankMoney(m => m + loss);
            } else {
              const currentTotal = player1Money + player2Money + bankMoney;
              const possibleGain = Math.min(amount, TOTAL_COIN_LIMIT - currentTotal);
              if (possibleGain > 0) {
                setPlayer1Money(m => m + possibleGain);
              }
            }
            setHistory(prev => [
              ...prev,
              {
                player1Money,
                player2Money,
                bankMoney
              }
            ]);
          }}
        />
        <PlayerMoney
          playerName="Player 2"
          money={player2Money}
          onChange={(amount) => {
            if (amount < 0) {
              const loss = Math.min(player2Money, -amount);
              setPlayer2Money(m => m - loss);
              setBankMoney(m => m + loss);
            } else {
              const currentTotal = player1Money + player2Money + bankMoney;
              const possibleGain = Math.min(amount, TOTAL_COIN_LIMIT - currentTotal);
              if (possibleGain > 0) {
                setPlayer2Money(m => m + possibleGain);
              }
            }
            setHistory(prev => [
              ...prev,
              {
                player1Money,
                player2Money,
                bankMoney
              }
            ]);
          }}
        />
        <BankMoney
          name="Bank Money"
          bankMoney={bankMoney}
          onChange={(amount) => {
            if (amount > 0) {
              const currentTotal = player1Money + player2Money + bankMoney;
              const possibleGain = Math.min(amount, TOTAL_COIN_LIMIT - currentTotal);
              if (possibleGain > 0) {
                setBankMoney(m => m + possibleGain);
              }
            }
            setHistory(prev => [
              ...prev,
              {
                player1Money,
                player2Money,
                bankMoney
              }
            ]);
          }}
       
       />
        <div style={{ textAlign: 'center', marginTop: '1rem' ,alignContent: 'space-around' }}>
        <button style={{ color:'rgba(0, 0, 0, 0.75)'}}
          onClick={() => {
            if (bankMoney === 0) return;
            const half = Math.floor(bankMoney / 2);
            const leftover = bankMoney % 2;
            setPlayer1Money((m) => m + half);
            setPlayer2Money((m) => m + half);
            setBankMoney(leftover);
            setHistory(prev => [
              ...prev,
              {
                player1Money,
                player2Money,
                bankMoney
              }
            ]);
          }}
        >
          Divide Bank
        </button>
      </div>
      </div>
     

      <div
    className="cardContainer"
    style={{
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
    }}
  >
    {Object.keys(colors).map((colorName) => (
      <ColorSection
        key={colorName}
        colorName={colorName}
        cards={colors[colorName]}
        onToggleCard={toggleCard}
        onSelectCard={(index) =>
          setSelectedCard({
            colorName,
            card: colors[colorName][index],
            index,
          })
        }
        selectedCard={selectedCard}
        assignPoints={assignPoints}
      />
    ))}
  </div>

      <div className="controls" style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={undoLast} disabled={history.length === 0}>
          Undo Last
        </button>
        <button onClick={resetGame} style={{ marginLeft: '1rem' }}>
          Reset
        </button>
      </div>
    </div>
  );
}
