import { useState } from "react";

function Leaderboard() {
  const [players, setPlayers] = useState([
    { name: "Alex", score: 120 },
    { name: "Sara", score: 150 },
    { name: "John", score: 90 }
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const addPlayer = () => {
    if (name === "" || score === "") return;

    const updatedPlayers = [
      ...players,
      { name, score: Number(score) }
    ].sort((a, b) => b.score - a.score);

    setPlayers(updatedPlayers);
    setName("");
    setScore("");
  };

  const changeScore = (index, value) => {
    const updated = [...players];
    updated[index].score += value;
    updated.sort((a, b) => b.score - a.score);
    setPlayers(updated);
  };

  return (
    <div className="leaderboard">
      <div className="add-player">
        <input
          type="text"
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button onClick={addPlayer}>Add Player</button>
      </div>

      {players.map((player, index) => (
        <div className="player" key={index}>
          <span>
            {index + 1}. {player.name}
          </span>

          <span className="score">{player.score}</span>

          <div className="buttons">
            <button onClick={() => changeScore(index, 10)}>+</button>
            <button onClick={() => changeScore(index, -10)}>-</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
