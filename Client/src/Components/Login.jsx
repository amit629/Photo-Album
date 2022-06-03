import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {loginUser} from '../Actions/Index'
function Login(props) {
  
  const loginSuccess=useSelector(state=>state.loginSuccess)
  const dispatch=useDispatch()

  const navigate=useNavigate()
    // const {loginUser,loginSuccess}=useContext(LoginContext)
    useEffect(()=>{
      if(!loginSuccess){
        localStorage.setItem("albumLogin",JSON.stringify(false))
      }
    })

  


    useEffect(()=>{
      if(loginSuccess){
        navigate("/album")
      }
    },[loginSuccess,navigate])
    const [loginData,setLoginData]=useState({
        userName:"",
        password:""
    })
    const handleChange=(e)=>{
        const {name,value}= e.target
        setLoginData((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleLogin=(e)=>{
        e.preventDefault()
        dispatch(loginUser(loginData))

    }
    
  return (
    <div>
      <form onSubmit={handleLogin}>
        <Grid container mt={10} justifyContent="center">
          <Grid item xs={5}>
          <Paper  variant="outlined" square >
            <Grid container justifyContent="center">
            <Grid item mt={2} xs={10} >
                <Typography variant="h3" fontWeight={500} style={{color:"#1565c0"}}>Login</Typography>
              </Grid>
              
              <Grid item mt={2} xs={10}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Username or Email id"
                  id="userName"
                  name="userName"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item mt={2} xs={10}>
                <TextField
                  variant="outlined"
                  type="password"
                  label="Password"
                  id="password"
                  name="password"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item mt={2} xs={10}>
                <Button variant="contained" fullWidth type="submit">
                    LOGIN
                </Button>
              </Grid>

              <Grid item mt={2} xs={10}>
                <Typography variant="body1">
                    New to PHOTO GALLERY?<br></br>
                    <Link to="/signup">Click here</Link> to create your new account.
                </Typography>   
              </Grid>
            </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
