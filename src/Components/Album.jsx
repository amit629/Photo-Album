import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ImagesContext from "../Context/ImagesContext";
import ImageListItem from "@mui/material/ImageListItem";

import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";

function Album(props) {
  // const { loginSuccess } = useContext(LoginContext);
  
  const loginSuccess=useSelector(state=>state.loginSuccess)
  const { ImagesCollection } = useContext(ImagesContext);
  const [filteredData,setFilteredData]=useState(ImagesCollection)
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginSuccess) {
      navigate("/login");
    }
  }, [loginSuccess, navigate]);

  
const filter=(item)=>{
  const filteredImages=ImagesCollection.filter((el)=>{
    return el.title===item
  })
  setFilteredData( item?filteredImages:ImagesCollection)
  
}


  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h2"
            style={{ fontFamily: "Kunstler Script", fontWeight: "bolder" }}
          >
            Welcome to Photo Gallery
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={4}>
              <Autocomplete
                freeSolo
                id="searchBar"
                disableClearable
                options={[...new Set(ImagesCollection.map((option) => option.title))]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by category"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onSelect={(e)=>filter(e.target.value)}
                    
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={3}>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Stack
                spacing={4}
                direction="row"
                sx={{ justifyContent: "center" }}
              >
              <Button variant="contained" p={4}  onClick={()=>filter()}>
                  All
                </Button>
                <Button variant="contained" p={4} onClick={()=>filter("Mountains")}>
                  Mountains
                </Button>
                <Button variant="contained" p={4} onClick={()=>filter("Birds")}>
                  Birds
                </Button>
                <Button variant="contained" p={4} onClick={()=>filter("Bikes")}>
                  Bikes
                </Button>
                <Button variant="contained" p={4} onClick={()=>filter("Beaches")}>
                  Beaches
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} m={5}>
          
            

              <Grid container spacing={2} justifyContent="center">
                  {  
                  (filteredData.map((item, index) => (
                <Grid item  key={index} xs={12} sm={6} md={4} xl={3}>
                <ImageListItem  style={{width:"100%", height:"100%", border:"1px solid black"}} >
                
                  <img src={item.image} alt={item.title} loading="lazy" style={{cursor:"pointer"}}/>
                 
                </ImageListItem>
                </Grid>
              )))}
            
                    
              </Grid>
              


          

          {/* <Grid container justifyContent="center" spacing={2} >
            {ImagesCollection.map((item, index) => (
              <Grid item xs={3} >
                <ImageListItem key={index}>
                  <img src={item.image} alt={item.title} loading="lazy"   />
                </ImageListItem>
              </Grid>
            ))}
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Album;
