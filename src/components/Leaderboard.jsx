import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState(() => {
    return JSON.parse(localStorage.getItem("players")) || [];
  });

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    if (!name || !score) return;

    const updated = [...players, { name, score: Number(score) }]
      .sort((a, b) => b.score - a.score);

    setPlayers(updated);
    setName("");
    setScore("");
  };

  const deletePlayer = (i) => {
    setPlayers(players.filter((_, index) => index !== i));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="page">
      <button className="logout-btn" onClick={logout}>Logout</button>

      <h1>🎮 Game Leaderboard</h1>

      <div className="leaderboard">
        <div className="add-player">
          <input
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
          <button onClick={addPlayer}>Add</button>
        </div>

        {players.map((p, i) => (
          <div className="player-card" key={i}>
            <span>{i + 1}. {p.name}</span>
            <span>{p.score}</span>
            <button onClick={() => deletePlayer(i)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
