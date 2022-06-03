import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';

function RenamePage(props) {
    const submitChanges=()=>{

    }    
    const handleChanges=()=>{

    }
    return (

        <>
        
        <Grid container justifyContent="center">
            <Grid item xs={8}>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width:"100%" },
      }}
      onSubmit={submitChanges}
      autoComplete="off"
    >
      <TextField id="outlined-basic" name="category"  label="Enter the category name" variant="outlined" onChange={handleChanges} required/>
      <TextField id="outlined-basic" name="imageName" label="Enter the new image name" variant="outlined" onChange={handleChanges} required/>
      <Button variant='contained'>Save Changes</Button>
     
    </Box>
            </Grid>
        </Grid>
            
        </>
    );
}

export default RenamePage;