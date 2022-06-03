import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import ImagesContext from "../Context/ImagesContext";
import ImageListItem from "@mui/material/ImageListItem";
import { Button, IconButton, Input, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deepOrange } from "@mui/material/colors";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { PhotosData } from "../Data/PhotosData";
import ImageUpload from "./ImageUpload";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RenamePage from "./RenamePage";
import { Box } from "@mui/system";

function Album(props) {
  // const { loginSuccess } = useContext(LoginContext);
  const loginSuccess = useSelector((state) => state.loginSuccess);
  const [rename,setRename]=useState(false)
  useEffect(()=>{
    notify()
  },[])
  
  const notify = () => toast("Logged in successfully!");
  
  useEffect(()=>{
    return async function(){
      const response=await fetch("http://localhost:5000/extract",{method:"GET"})
      if(response.ok)
      {
        const localPhotos=await response.json()
        localStorage.setItem("albumData",JSON.stringify(localPhotos))
      }

    }
  })

  const [imageDetails,setImageDetails]=useState({
    category:"",
    imageName:""
})

const submitChanges= async(imageName)=>{
  console.log(imageName)

  console.log(imageDetails)
  var extensionType=(imageName.split("."))[1]
  
  const response=await fetch(`http://localhost:5000/rename/${imageName}/${imageDetails.category}/${imageDetails.imageName}.${extensionType}`,{method:"POST"})
  if(response.ok)
  {
    console.log("Image details has been changed")
  }
    
}    
const handleChanges=(e)=>{
    const {name,value}=e.target

    setImageDetails((prev)=>({
        ...prev,
        [name]:value
    }))
    
}


  const photos=JSON.parse(localStorage.getItem("albumData"))
  
    /* const { ImagesCollection } = useContext(ImagesContext); */
  const [filteredData, setFilteredData] = useState(photos);
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomUrl, setZoomUrl] = useState();
  
  const navigate = useNavigate();


    useEffect(() => {
    if (!loginSuccess) {
      navigate("/login");
      localStorage.setItem("albumData",JSON.stringify([]))
    }
  }, [loginSuccess, navigate]);

  
  const filter = (item) => {
    const filteredImages = photos.filter((el) => {
      return el.imageTag === item;
    })  ;
    setFilteredData(item ? filteredImages : photos);
  };

  const handleClick = (url) => {
    setZoomImage(true);
    setZoomUrl(url);
  };
  const handleX=()=>{
    setZoomImage(false)
    setZoomUrl()
  }

const removeImage= async(item)=>{
  const response=await fetch(`http://localhost:5000/delete/${item}`,{method:"POST"})
  console.log(response)
  if(response.ok)
  {
    console.log("Image has been deleted")
  }
} 

const renameImage= async(item)=>{
  setRename(true)
} 
  return (
    <div>
    
    <ToastContainer/>
      <Grid container justifyContent="center" style={{backgroundColor:"seashell"}}>
        {!zoomImage ? (
          <Grid item xs={12}>
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
                    options={[
                      ...new Set(
                        photos.map((option) => option.title)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search by category"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                        onSelect={(e) => filter(e.target.value)}
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
                    <Button variant="contained" p={4} onClick={() => filter()}>
                      All
                    </Button>
                    <Button
                      variant="contained"
                      p={4}
                      onClick={() => filter("Mountains")}
                    >
                      Mountains
                    </Button>
                    <Button
                      variant="contained"
                      p={4}
                      onClick={() => filter("Birds")}
                    >
                      Birds
                    </Button>
                    <Button
                      variant="contained"
                      p={4}
                      onClick={() => filter("Bikes")}
                    >
                      Bikes
                    </Button>
                    <Button
                      variant="contained"
                      p={4}
                      onClick={() => filter("Beaches")}
                    >
                      Beaches
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            <ImageUpload/>

            <Grid item xs={12} m={5}>
              <Grid container spacing={2} justifyContent="center">
              
                {filteredData.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} xl={3}>
                  
                    <ImageListItem
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid black",
                        position:"relative"
                      }}
                    > 
                      
                      <Grid sx={{display:"flex",justifyContent:"flex-start"}}><Button  style={{position:"absolute"}} onClick={renameImage} ><EditIcon/></Button></Grid>
                      <Grid sx={{display:"flex",justifyContent:"flex-end"}}><Button style={{position:"absolute"}} onClick={()=>removeImage(item.imageName)}><DeleteIcon/></Button></Grid>
                      {!rename?
                        <img
                        src={item.imageUrlName}
                        alt={item.imageTag}
                        loading="lazy"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(item.imageUrlName, item.ImageTag)}
                      />:
                      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width:"100%" },
      }}
      
      autoComplete="off"
    >
        <Grid container justifyContent="center">
            <Grid item xs={8}>
      
      
      <TextField id="outlined-basic" name="category"  label="Enter the category name" variant="outlined" onChange={handleChanges} required sx={{mt:"15px"}}/>
      <TextField id="outlined-basic" name="imageName" label="Enter the new image name" variant="outlined" onChange={handleChanges} sx={{mt:"15px"}} required/>
      <Button variant='contained' type='submit' onClick={()=>submitChanges(item.imageName)} sx={{mt:"15px"}}>Save Changes</Button>
     
    
            </Grid>
        </Grid>
       </Box>
                      }
                    </ImageListItem>  
                  </Grid>
                ))}
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
        ) : (
          
          <Grid item xs={12} style={{marginTop:"10%",marginLeft:"30%"}}>
            <Grid style={{width:"600px", display:"flex",justifyContent:"flex-end"}}>
            <Typography style={{fontSize:"20px",cursor:"pointer"}} onClick={handleX}>Close</Typography>
            </Grid>
            <Grid style={{width:"600px", height:"600px"}}>
            <img src={zoomUrl} alt="zoom"></img>  
            </Grid>
          </Grid>
          
          
        )}
      </Grid>
    </div>
  );
}

export default Album;
