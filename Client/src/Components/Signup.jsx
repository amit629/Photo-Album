import React, {  useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';

import {addUser} from '../Actions/Index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function Signup(props) {
  const signUpSuccess=useSelector(state=>state.signUpSuccess)
const dispatch=useDispatch()
const navigate=useNavigate()
// const {addUser,signupSuccess,setSignupSuccess}=useContext(LoginContext)


useEffect(()=>{
  if(signUpSuccess)
  {
    navigate("/login")
    return{type:"signupstatus"}
  }
},[signUpSuccess,navigate])
const [newUser,setNewUser]=useState({
    fullName:"",
    userName:"",
    email:"",
    contact:"",
    password:""
})
const handleChange=(e)=>{
    const {name,value}= e.target
    setNewUser((prev)=>({
        ...prev,[name]:value
    }))
}

const registerUser=(e)=>{
    e.preventDefault()
    dispatch(addUser(newUser))
    
}




  return (
    <div>
      <form onSubmit={registerUser}> 
        <Grid container mt={10} justifyContent="center">
          <Grid item xs={5}>
          <Paper  variant="outlined" square >
            <Grid container justifyContent="center">
            <Grid item mt={2} xs={10}>
                <Typography variant="h3" fontWeight={500} style={{color:"#1565c0"}} >Signup</Typography>
              </Grid>
              <Grid item mt={2} xs={10}>
                <TextField
                  variant="outlined"
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item mt={2} xs={10}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Username"
                  id="userName"
                  name="userName"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item mt={2} xs={10}>
                <TextField
                  variant="outlined"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item mt={2} xs={10}>
                <TextField
                  variant="outlined"
                  type="number"
                  label="Contact"
                  id="contact"
                  name="contact"
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
                    SIGNUP
                </Button>
              </Grid>
              <Grid item mt={2} xs={10}>
                <Typography variant="body1">
                    Already have an account?<br></br>
                    <Link to="/login">Click here</Link> to login.
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

export default Signup;
