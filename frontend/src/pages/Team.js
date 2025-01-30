import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserTeam } from "../api";

function Team() {
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const data = await getUserTeam(token);
        setTeam(data);
      } catch {
        alert("Failed to load team");
      }
    };
    fetchTeam();
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">My Team</h2>
      {team ? (
        <div>
          <p>Budget: ${team.budget.toLocaleString()}</p>
          <h3 className="mt-4 font-bold">Players</h3>
          <ul className="mt-2">
            {team.players.map((player, index) => (
              <li key={index} className="border p-2 mt-1">
                {player.name} - {player.position} - $
                {player.price.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading team...</p>
      )}
    </div>
  );
}

export default Team;
