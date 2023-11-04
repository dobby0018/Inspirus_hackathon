import React, { useContext, useState } from 'react'
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
import { Paper, TextField } from '@mui/material';
import AppHeader from './AppHeader';
import { SiteConfig } from '../App';
import { SnackbarProvider, useSnackbar } from 'notistack';
import toast, { Toaster } from 'react-hot-toast';


const Section = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    
    flex:1,
    height:"100%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background:"#1b1b1b",
   
    overflowY:"auto",

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
  const [hasUploadedData, setHasUploadedData] = useState(false)
  const [excelLink, setExcelLink] = useState("")
  const config = useContext(SiteConfig)
  const { enqueueSnackbar } = useSnackbar();

  const postExcelSheet = async() => {
    
    
    if(excelLink){
      try{
        const request = await fetch("http://192.168.10.214:5000/readcsv",{
          method:"POST",
          body:JSON.stringify({
              stats:excelLink
          })
        });
        console.log("Req: ", request.status)
        if(request.status === 201) {

          toast.success('Successfully submitted csv file')
        }
        else{
          toast.error('There was an error submitting csv file!');
        }
      }
      catch(e){
        toast.error('There was an error submitting csv file!');
      }
    }
    else {
      toast.error('Please add the link before pressing submit!');
    }
  }

  return (
    
    <Section overflow={"hidden"}>
        <AppHeader />
   
        <Box className="user-welcome-section">
            <p>Hello, {config.user?.coachName} 👋</p>
            <p className='user-welcome-message'>{hasUploadedData ? "Ella Toone has shown 10% improvement in Attack" : "Let's help you get started 🫡"}</p>
            
            {
              hasUploadedData &&
                <Box className="user-welcome-stats">
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
                </Box>
            }
        </Box>
        {
          hasUploadedData &&
          <div style={{border:"1px solid white", padding:"2rem", margin:"2rem", color:"white", textAlign:"left"}}>
            <p className='excel-data-title'>Excel data</p>
            
            <TextField placeholder='Enter link to your csv file...' className='excel-input' onChange={(e)=>setExcelLink(e.target.value)}  style={{border:"1px solid white", borderRadius:"5px", color:"white", width:"100%"}}/>
            <Button onClick={()=>postExcelSheet()} variant="contained" size='large' disableElevation style={{marginTop:"1rem"}}>Submit</Button>
            
          </div>
        }
        {
          !hasUploadedData &&
          <Grid container flex spacing={2}  padding={"1rem 2rem 2rem 2rem"}>
            
            <Grid xs={12} md={5} flex flexDirection={'column'} height={"100vh"}>
                <Box className="player-info">
                  <Box className="player-info-box"> 
                      <Box className="player-info-box-header"> 
                        
                        <div className='player-info-box-container'>
                          <div className='player-info-box-image-container'>
                            <div className='player-info-box-image-box'>
                              <img src={"https://assets.manutd.com/AssetPicker/images/0/0/12/31/794526/ELLA_TOONE_thumb.jpg"} height={100} className='player-info-box-image' />
                            </div>
                          </div>
                          <p className='player-info-name'><span className='player-info-firstname'>Ella</span> Toone</p>
                          
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
        }
        <Toaster />
    </Section>
    
  )
}

export default Main