import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid'; // Grid version 2
import Sidebar from '../../components/Sidebar';
import DashboardContainer from '../../components/Container';
import AppHeader from "../../components/AppHeader"
import SiteConfig from '../../App';
import { useNavigate, useNavigation } from 'react-router-dom';


function Dashboard({children}) {
  const config = useContext(SiteConfig);
  const navigate = useNavigate();
  console.log("Config: ", config)
  const getPlayerDetails = async() => {
    const rawRespone = await fetch("");
  }

  useEffect(()=>{
    if(config?.user === null)
      navigate("/login")
  },[])
  return (
    <Grid container>
        <Grid item xs={12} className="hidden-mobile" md={3} flex flexDirection={'column'} height={"100vh"} backgroundColor="red">
            <Sidebar />
        </Grid>
        <Grid xs={12} md={9} flex flexDirection={'column'} height={"100vh"} backgroundColor="#1b1b1b">
          
            {children}
        </Grid>
        
    </Grid>
  )
}

export default Dashboard