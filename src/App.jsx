import { useGame } from "./GameContext";
import Scoreboard from "./Scoreboard";
import Welcome from "./Welcome";

export default function App() {
  const { playing } = useGame();
  return (
    <>
      <h1>Whack-a-Mole</h1>
      {playing ? (
        <>
          <Scoreboard />
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
}
