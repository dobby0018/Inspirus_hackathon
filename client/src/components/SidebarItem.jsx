import React from 'react'

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


function SidebarItem({path="/dashboard", name, icon}) {
    const Item = styled(Paper)(({ theme }) => ({
        background:window.location.pathname === path ? "#32303c" : "transparent",
        color:"white",
        display:"flex",
        alignItems:"center",
        gap:"1.2rem",
        borderRadius:"50px 0px 0px 50px",
        padding:"2px 0px 2px 10px",
        borderRight: window.location.pathname === path && "5px solid white",
        boxShadow:"none"
    }));
  return (
    <Link to={path}>
        <Item>
            <div className={`sidebaritem-icon ${window.location.pathname === path && "active-icon"}`}>
                {icon}
            </div>
            <p className='sidebaritem-text'>{name}</p>
        </Item>
    </Link>
  )
}

export default SidebarItem