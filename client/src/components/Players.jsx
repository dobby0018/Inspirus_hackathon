import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import InfoStat from './InfoStat';
import LanguageIcon from '@mui/icons-material/Language';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import RoomIcon from '@mui/icons-material/Room';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DashboardContainer from './Container';
import PredictionBar from './PredictionBar';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import { Paper } from '@mui/material';

const Section = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    
    flex:1,
    height:"100%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background:"#1b1b1b",
    maxHeight:"100%",
    overflowY:"auto"
}));

const FavoriteButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  border:"1px solid white",
  borderRadius:"100px",
  fontSize:"0.8rem",
  color:"white"
}));

let data = [
  {
    name:"Goals",
    value:"7"
  },
  {
    name:"Assists",
    value:"5"
  },
  {
    name:"Minutes per Goal",
    value:"220.0"
  },
  {
    name:"Pass Accuracy",
    value:"81%"
  },
  {
    name:"Shot Accuracy",
    value:"66%"
  },
  {
    name:"Cross Accuracy",
    value:"9%"
  },
  {
    name:"Right Foot Goals",
    value:"5"
  },
  {
    name:"Left Foot Goals",
    value:"2"
  },
  {
    name:"Headed Goals",
    value:"0"
  },
  {
    name:"Goals - Inside Box",
    value:"5"
  },
  {
    name:"Goals - Outside Box",
    value:"2"
  },
  {
    name:"Successful Dribbles",
    value:"43"
  },
  {
    name:"Offsides",
    value:"18"
  }
]


const radarData = [
  {
    "subject": "Attack",
    "A": 120,
    
    "fullMark": 150
  },
  {
    "subject": "Offense",
    "A": 135,
   
    "fullMark": 150
  },
  {
    "subject": "Defense",
    "A": 100,
    
    "fullMark": 150
  },
  {
    "subject": "Goal",
    "A": 70,
    "fullMark": 150
  },
  {
    "subject": "Team",
    "A": 99,
    "fullMark": 150
  },
  
]
function Main() {
  return (
    <Section overflow={"hidden"}>
        
        <Box className="user-welcome-section">
            <p>Hello, Marcus 👋</p>
            <p className='user-welcome-message'>Ken Rosenberg has shown 10% improvement in Attack</p>
            {/*<Box className="user-welcome-stats">
              <Paper className='user-welcome-stat'>
                <p className='user-welcome-stat-type'>43</p>
                <p className='user-welcome-stat-value'>J</p>
              </Paper>
              <Paper className='user-welcome-stat'>
                <p className='user-welcome-stat-type'>43</p>
                <p className='user-welcome-stat-value'>J</p>
              </Paper>
              <Paper className='user-welcome-stat'>
                <p className='user-welcome-stat-type'>43</p>
                <p className='user-welcome-stat-value'>J</p>
              </Paper>
            </Box>*/}
        </Box>
        <Grid container flex spacing={2}  padding={"1rem 2rem 2rem 2rem"}>
          
          <Grid xs={12} md={5} flex flexDirection={'column'} height={"100vh"}>
              <Box className="player-info">
                <Box className="player-info-box"> 
                    <Box className="player-info-box-header"> 
                      
                      <div className='player-info-box-container'>
                        <div className='player-info-box-image-container'>
                          <div className='player-info-box-image-box'>
                            <img src={"https://resources.premierleague.com/premierleague/photos/players/250x250/p198869.png"} height={100} className='player-info-box-image' />
                          </div>
                        </div>
                        <p className='player-info-name'><span className='player-info-firstname'>Marcus</span> Rashford</p>
                        
                      </div>
                      
                    </Box>
                    
                </Box>
                <Box className="player-info-stats-section"> 
                      <InfoStat type="Nationality" value="English" icon={<LanguageIcon />}/>
                      <InfoStat type="Club" value="Man. Utd" icon={<MilitaryTechIcon />}/>
                      <InfoStat type="Shirt No." value="10" icon={<CheckroomIcon />}/>
                      <InfoStat type="Position" value="Attack" icon={<RoomIcon />}/>
                      <InfoStat type="Height" value="10ft" icon={<LineWeightIcon />}/>
                      <InfoStat type="Age" value="23" icon={<CalendarMonthIcon />}/>
                </Box>
                
                
              </Box>
              <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                <RadarChart outerRadius={90} width={300} height={300} data={radarData} className='radar-chart'>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Player" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
                    
                </RadarChart>
              </Box>
          </Grid>
          <Grid xs={12} md={7} flex flexDirection={'column'} height={"100vh"}>
            <Box className="player-info"> 
              <p className='player-analysis-text'>Player Analysis</p>
              <div className='player-analysis-club-icon'>
                  <img src={"https://imgs.search.brave.com/YFJ44CGX-SkkFetU2XxQG25jxEFe50q8bOruwLqmCac/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Ny83YS9NYW5jaGVz/dGVyX1VuaXRlZF9G/Q19jcmVzdC5zdmcv/NTEycHgtTWFuY2hl/c3Rlcl9Vbml0ZWRf/RkNfY3Jlc3Quc3Zn/LnBuZw"} height={40} width={40} />
              </div>
              <p className='player-analysis-club-name'>Man United</p>
              <Grid container flex spacing={1}  padding={"2rem"}>
                <Grid xs={6} flex flexDirection={'column'}>
                  <div className='player-analysis-box'>
                    <div className='player-analysis-icon'>
                        <ArrowCircleRightIcon />
                    </div>
                    <p className='player-analysis-type-text'>Attacking</p>
                    <Box className="player-analysis-types">
                      <Box className="player-analysis-type">
                          {
                            data.map((type, i)=>(
                              <p key={i}>{type.name}</p>
                            ))
                          }
                      </Box>
                      <Box className="player-analysis-type-value">
                          {
                            data.map((type, i)=>(
                              <p key={i}>{type.value}</p>
                            ))
                          }
                      </Box>
                    </Box>
                  </div>
                </Grid>
                <Grid xs={6} flex flexDirection={'column'}>
                  <div className='player-analysis-box'>
                    <div className='player-analysis-icon'>
                        <ArrowCircleLeftIcon />
                    </div>
                    <p className='player-analysis-type-text'>Defending</p>
                    <Box className="player-analysis-types">
                      <Box className="player-analysis-type">
                          {
                            data.map((type, i)=>(
                              <p key={i}>{type.name}</p>
                            ))
                          }
                      </Box>
                      <Box className="player-analysis-type-value">
                          {
                            data.map((type, i)=>(
                              <p key={i}>{type.value}</p>
                            ))
                          }
                      </Box>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <DashboardContainer />
            <PredictionBar />
          </Grid>
        </Grid>
        
    </Section>
  )
}

export default Main