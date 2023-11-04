import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Box className="home">
        <p className='home-title'>Footy Stats</p>
        <Link to="/signup">
          <Button variant="contained" size='large' disableElevation>Create Account</Button>
        </Link>
        <Link to="/login">
          <Button variant="contained" size='large' disableElevation>Login to Account</Button>
        </Link>
    </Box>
  )
}

export default Home