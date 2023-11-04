import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material";

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

const data = [
    {
        name: "arsenal",
        image: "https://th.bing.com/th?id=OSB.55mqrgUaDKlDJFXoqUW5KQ--.png&w=60&h=60&qlt=90&o=6&dpr=2&pid=BingSports",
        percentage:39.1
    },
    {
        name: "Tottenhamm Hotspurs",
        image: "https://th.bing.com/th?id=OSB.LoEX7ixCEk1hBrdELKlHyA--.png&w=60&h=60&qlt=90&o=6&dpr=1.3&pid=BingSports",
        percentage:79.5
    }
]

function PredictionBar() {
  const [team, setTeam] = useState({name:"same", image:"same", percentage:50})

  return (
    <div className="heatmap-container predictor-container">
        <h4 className="heatmap-title">Predictor</h4>
        <FormControl fullWidth>
            <p>Against</p>
            <SelectInput
                labelId="demo-simple-team-select-label"
                id="demo-simple-team-select"
                value={team}
                label="Against"
                onChange={(e)=>setTeam(e.target.value)}
                placeholder='Select team'
            >
                {
                    data.map((team,i)=>(
                    <MenuItem value={team}>{team.name}</MenuItem>

                    ))
                }
            </SelectInput>
        </FormControl>
        <div className='predictionbar'>
            <div className='player-analysis-club-icon'>
                <img src={"https://imgs.search.brave.com/YFJ44CGX-SkkFetU2XxQG25jxEFe50q8bOruwLqmCac/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Ny83YS9NYW5jaGVz/dGVyX1VuaXRlZF9G/Q19jcmVzdC5zdmcv/NTEycHgtTWFuY2hl/c3Rlcl9Vbml0ZWRf/RkNfY3Jlc3Quc3Zn/LnBuZw"} height={40} width={40} />
            </div>
            <div className='predictionbar-bar'>
                <div className='predictionbar-bar-home' style={{width:`${Math.abs(100-team.percentage)}%`}}>{Math.abs(100-team.percentage)}%</div>
                <div className='predictionbar-bar-away' style={{width:`${team.percentage}%`}}>{team.percentage}%</div>
            </div>
            <div>
                <div className='player-analysis-club-icon'>
                    <img src={team.image} height={40} width={40} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PredictionBar