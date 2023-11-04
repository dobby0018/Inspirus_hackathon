import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [coachName, setCoachName] = useState("")
    const [password, setPassword] = useState("")
  
    const login = async() => {
      const request = await fetch("http://192.168.10.214:5000/login/",{
        method:"POST",
        body:JSON.stringify({
            coachName,
            password
        })
      });
      console.log("Req: ", request, coachName, password)
      if(request.status === 201){
        console.log("Request data: ", request.json())
        navigate("/dashboard")
      }
    }

  return (
    <Grid container>
        <Grid xs={5} className='loginpage-banner'>
            <img src={"https://cdn3d.iconscout.com/3d/premium/thumb/login-verified-6251835-5117015.png?f=webp"} />
            <p>Login to your account to view all the latest analytics and insights about players</p>
        </Grid>
        <Grid xs={7} display={"flex"} flexDirection={"column"} px={"10rem"} gap={"2rem"} justifyContent={"center"}>
            <p className='loginpage-title'>Login in!</p>
            <TextField value={coachName} onChange={(e)=>setCoachName(e.target.value)} id="outlined-basic" label="Coach Name" variant="outlined" />
            <TextField value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
            <Button onClick={login} variant="contained" size='large' disableElevation>Login!</Button>
        </Grid>
    </Grid>
  )
}

export default LoginPage