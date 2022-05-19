import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useDispatch, useSelector } from 'react-redux';

import {Logout} from '../Actions/Index'

const Appbar=()=> {
const loginSuccess=useSelector(state=>state.loginSuccess)
  const dispatch=useDispatch()
  // const {loginSuccess,handleLogout}=React.useContext(LoginContext)
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PHOTO GALLARY
          </Typography>

          {!loginSuccess?(<Button color="inherit" component={Link} to="/login"  endIcon={<LoginIcon />}>Login </Button>):(<Button color="inherit"  startIcon={<LogoutIcon />} onClick={()=>dispatch(Logout)}>Logout </Button>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Appbar;