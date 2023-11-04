import { Button, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { SiteConfig } from '../../App';

function SignUpPage() {
  const navigate = useNavigate();
  const config = useContext(SiteConfig);
  const [coachName, setCoachName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [password, setPassword] = useState("")

  const login = async() => {
    const request = await fetch("http://192.168.10.214:5000/register/",{
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body:JSON.stringify({
            coachName:coachName,
            teamName:teamName,
            password:password,
            hasCreated:false
        })
      });
      console.log("Req: ", request)
    if(request.status === 201){
      //config.setUser({ coachName:coachName, teamName:teamName, password:password })
      navigate("/login")
      
    }
  }

  return (
    <Grid container>
        <Grid xs={5} className='loginpage-banner'>
            
            <img src={"https://cdn3d.iconscout.com/3d/premium/thumb/login-3025715-2526913.png"} />
            <p>Sign up to create your account to view all the latest analytics and insights about players</p>
        </Grid>
        <Grid xs={7} display={"flex"} flexDirection={"column"} px={"10rem"} gap={"2rem"} justifyContent={"center"}>
            <p className='loginpage-title'>Sign Up!</p>
            <TextField value={coachName} onChange={(e)=>setCoachName(e.target.value)} id="outlined-basic" label="Coach Name" variant="outlined" />
            <TextField value={teamName} onChange={(e)=>setTeamName(e.target.value)} id="outlined-basic" label="Team Name" variant="outlined" />
            <TextField value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />

            <Button onClick={login} variant="contained" size='large' disableElevation>Sign Up!</Button>
        </Grid>
    </Grid>
  )
}

export default SignUpPage