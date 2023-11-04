import React, { useState, useEffect } from "react";


import matches from "../data/4.json";
import Heatmap from "./Heatmap";
import FilterForm from "./FilterForm";

function DashboardContainer() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([{
    player: {
        id: 19502,
        name: "Meaghan Sargeant"
    },
    position: {
        id: 3,
        name: "Right Center Back"
    },
    jersey_number: 3
}]);
  const [match, setMatch] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  const fetchMatchData = (match) => {
    fetch(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match.match_id}.json
    `)
      .then((response) => response.json())
      .then((matchData) => {
        const homeTeamData = matchData.filter((event) => event.tactics).find((event) => event.team.name === match.home_team.home_team_name);
        const awayTeamData = matchData.filter((event) => event.tactics).find((event) => event.team.name === match.away_team.away_team_name);
        setMatchData(matchData);
        setHomeTeam(homeTeamData);
        setAwayTeam(awayTeamData);
        setPlayers([...homeTeamData.tactics.lineup, ...awayTeamData.tactics.lineup]);
        
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if(match)
    fetchMatchData(match);
  }, [match, selectedPlayers]);

  return (
    <div className="heatmap-container">
      <h4 className="heatmap-title">{matches && matches[0] && matches[0].competition ? matches[0].competition.competition_name : ""}</h4>
      <h6 className="heatmap-subtitle">Season: {matches && matches[0] && matches[0].season ? matches[0].season.season_name : ""}</h6>
      <FilterForm
        matches={matches}
        setMatch={setMatch}
        players={players}
        setPlayers={setSelectedPlayers}
      />
      {match ? (
        <div>
          <h4>{match.home_team.home_team_name} ({match.home_score}) vs {match.away_team.away_team_name} ({match.away_score})</h4>
          <h5>Date: {match.match_date}</h5>
          <div className="chartGrid">
            <div className="bx--grid">
              <div className="bx--row">
                {selectedPlayers.length > 0 ? (
                  selectedPlayers.map((player, index) => (
                    <div className="bx--col" key={index}>
                      <Heatmap
                        data={matchData}
                        playerName={player.player.name}
                        playerPosition={player.position.name}
                      />
                    </div>
                  ))
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default DashboardContainer;
