import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SidebarItem from './SidebarItem';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HomeIcon from '@mui/icons-material/Home';

const Section = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    
    flex:1,
    height:"100%",
    textAlign: 'center',
    display:"flex",
    flexDirection:"column",
    gap:"1rem",
    color: theme.palette.text.secondary,
    background:"#23212d",
    padding:"0rem 0rem 2rem 2rem"
}));


function Sidebar() {
  return (
    <Section>
      <p className='sidebar-title'>Footy Stats</p>
      <SidebarItem path='/dashboard' name="Dashboard" icon={<HomeIcon />}/>
      <SidebarItem path='/players' name="Players" icon={<PeopleOutlineIcon />}/>
      <SidebarItem path='/analytics' name="Analytics" icon={<AutoGraphIcon />}/>
    </Section>
  )
}

export default Sidebar