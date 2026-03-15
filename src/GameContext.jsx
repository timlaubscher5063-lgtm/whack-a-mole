import { createContext, useState, useContext, useEffect, useRef } from "react";

const NUM_HOLES = 9;

const GameContext = createContext();

export function GameProvider({ children }) {
  const [field, setField] = useState(makeField());
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);

  const whack = () => {
    setField(makeField());
    setScore(score + 1);
  };

  const start = () => {
    setScore(0);
    setField(makeField());
    setPlaying(true);
  };

  const stop = () => {
    setPlaying(false);
  };

  const value = {
    field,
    score,
    playing,
    whack,
    start,
    stop,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw Error("Game context must be used within GameProvider");
  return context;
}

function makeField(field = Array(NUM_HOLES).fill(false)) {
  const holes = field.reduce((holes, isMole, i) => {
    if (!isMole) holes.push(i);
    return holes;
  }, []);
  const mole = holes[Math.floor(Math.random() * holes.length)];

  const newField = Array(NUM_HOLES).fill(false);
  newField[mole] = true;
  return newField;
}
