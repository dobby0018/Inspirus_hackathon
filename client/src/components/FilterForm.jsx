import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, Input, styled } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';

const SelectInput = styled(Select)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    color:"white",
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: 'red',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      border:"1px solid black"
    },
  },
}));

function FilterForm(props) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState();

  const setMatch = (match) => {
    setSelectedMatch(match);
    props.setMatch(match);
  };

  const setPlayers = (players) => {
    console.log("Player: ", players)
    setSelectedPlayers(players)
    props.setPlayers([players]);
  };



  return (
    <div className="filterForm">
      <FormControl fullWidth>
        <p>Match</p>
        <SelectInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedMatch}
          label="Match"
          onChange={(e)=>setMatch(e.target.value)}
        >
          {
            props.matches.map((match,i)=>(
              <MenuItem value={match}>{`${match.home_team.home_team_name} (${match.home_score}) vs ${match.away_team.away_team_name} (${match.away_score})` }</MenuItem>

            ))
          }
        </SelectInput>
      </FormControl>
      {/*<FormControl fullWidth>
        <p>Player</p>
        <SelectInput
          labelId="demo-simple-player-select-label"
          id="demo-simple-player-select-label"
          value={selectedPlayers}
          label="Player"
          onChange={(e)=>setPlayers(e.target.value)}
        >
          {
            props.players.map((item,i)=>(
              <MenuItem value={item}>{(item && item.player ? item.player.name : "")}</MenuItem>

            ))
          }
        </SelectInput>
        </FormControl>*/}
     
    </div>
  );
}

export default FilterForm;
