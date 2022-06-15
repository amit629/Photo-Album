import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ImageListItem from "@mui/material/ImageListItem";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {
  Backdrop,
  Button,
  Drawer,
  Fade,
  Modal,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import { Box } from "@mui/system";
import Modals from "./Modals"

function Album(props) {
  // const { loginSuccess } = useContext(LoginContext);
  const navigate = useNavigate();
  const loginSuccess = useSelector((state) => state.loginSuccess);
  const photos = JSON.parse(localStorage.getItem("albumData"));
  const [filteredData, setFilteredData] = useState(photos);
  /* const [zoomImage, setZoomImage] = useState(false);
  const [zoomUrl, setZoomUrl] = useState(); */
  const [imageFile, setImageFile] = useState([]);
  const [category, setCategory] = React.useState("");
  /* const [renamedImageId, setRenamedImageId] = useState(); */
  const [imageEditName,setImageEditName]=useState()
  const [clickedImg,setClickedImage]=useState(null)
  const [currentIndex,setCurrentIndex]=useState(null)
  const notify = () => toast("Logged in successfully!");
  useEffect(() => {
    notify();
  }, []);
  useEffect(() => {
    return async function () {
      const response = await fetch("http://localhost:5000/extract", {
        method: "GET",
      });
      if (response.ok) {
        const localPhotos = await response.json();
        localStorage.setItem("albumData", JSON.stringify(localPhotos));
      }
    };
  });
  useEffect(() => {
    if (!loginSuccess) {
      navigate("/login");
      localStorage.setItem("albumData", JSON.stringify([]));
    }
  }, [loginSuccess, navigate]);
  useEffect(() => {
    filter();
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'seashell',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageDetails, setImageDetails] = useState({
    category: "",
    imageName: "",
  });

  const toggleDrawer = (anchor, open) =>{
    /* if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    } */
    
    setSliderState({ ...sliderState, [anchor]: open });
  };
  const openEditSlider=(item)=>{
    setImageEditName(item.imageName)
    console.log(item)
  }
  const submitChanges = async () => {
    /* var extensionType1 = imageName.split(".").pop();
    console.log(extensionType1); */
    var extensionType = imageEditName.split(".").pop();

    const response = await fetch(
      `http://localhost:5000/rename/${imageEditName}/${imageDetails.category}/${imageDetails.imageName}.${extensionType}`,
      { method: "POST" }
    );
    if (response.ok) {
      console.log("Image details has been changed");
    }
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setImageDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* const { ImagesCollection } = useContext(ImagesContext); */

  /* Image Filter Function Start */

  const filter = (item) => {
    const filteredImages = photos.filter((el) => {
      return el.imageTag === item;
    });
    setFilteredData(item ? filteredImages : photos);
  };
  /* Image Filter Function End */
  const removeImage = async (item) => {
    const response = await fetch(`http://localhost:5000/delete/${item}`, {
      method: "POST",
    });
    if (response.ok) 
    {
      console.log("Image has been deleted");
    }
  };

/*   const renameImage = async (item) => {
    setRename(!rename);
    if(rename)
    {
      setRenamedImageId(item);
    }
    else
    {
      setRenamedImageId()
    }
  }; */

  const handleImageUpload = (e) => {
    /* setImageFile(e.target.files[0]); */
    setImageFile(e.target.files);
    /* setImageName(e.target.files[0].name); */
  };

  const handleCategoryUploadChange = (event) => {
    setCategory(event.target.value);
  };
  const handleAddImage = async () => {
    const data = new FormData();
    for (let i = 0 ; i < imageFile.length ; i++) {
      data.append("images", imageFile[i]);
  }
    /* data.append("image",imageFile); */
    data.append("category", category);  
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data
    });
      
    if (response.ok) {
      console.log("File uploaded Successfully");
    } 
    else {
      console.log("Something went wrong");
    }
  };

  /*_______________________Side Slider Start__________________________  */
  const [sliderState, setSliderState] = React.useState({left: false});




  const list = (anchor) => (
    <Box
      sx={{ width:300 }}
      role="presentation"
    >
    <Grid container justifyContent="center">
                            <Grid item xs={8}>
                            <Typography
                variant="h2"
                style={{ fontFamily: "Goudy Old Style", fontWeight: "bolder",fontSize:"25px",textAlign:"center" }}
              >
                UPDATE IMAGE DETAILS
              </Typography>
                              <TextField
                                id="outlined-basic"
                                name="category"
                                label="New category name"
                                variant="outlined"
                                onChange={handleChanges}
                                required
                                sx={{ mt: "15px" }}
                              />
                              <TextField
                                id="outlined-basic"
                                name="imageName"
                                label="New image name"
                                variant="outlined"
                                onChange={handleChanges}
                                sx={{ mt: "15px" }}
                                required
                              />
                              
                              <Button
                                variant="contained"
                                type="submit"
                                onClick={() => {
                                  toggleDrawer(anchor, false);
                                  submitChanges()
                                }}
                                onKeyDown={()=>{
                                  submitChanges();
                                  toggleDrawer(anchor, false)}}
                                sx={{ mt: "15px" }}
                              >
                                Save Changes
                              </Button>
                            </Grid>
                          </Grid>
    </Box>
  );
/*_______________________Side Slider End__________________________  */

const handleClick=(item,index)=>{
  // setCurrentIndex(index)
  setClickedImage(item.imageUrlName)
}
/* const handleRotationRight=()=>{
  const totalLength=photos.length
  if(currentIndex+1>=totalLength)
  {
    setCurrentIndex(0)
    const newUrl=photos[0].imageUrlName
    setClickedImage(newUrl)
    return;
  }
  const newIndex=currentIndex+1
  const newUrl=photos.filter(item=>{
    return  photos.indexOf(item)===newIndex;
  })
  const newItem=newUrl[0].imageUrlName
  setClickedImage(newItem)
  setCurrentIndex(newIndex)
} */
  return (
    <div>
      <ToastContainer />
      <Grid
        container
        justifyContent="center"
        style={{ backgroundColor: "seashell" }}
      >
        {
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
                      ...new Set(photos.map((option) => option.imageTag)),
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
            {/* __________________Category Buttons Start___________ */}
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
            {/* __________________Category Buttons End___________ */}
            {/* __________________Image upload code start____________________ */}
            <Grid item xs={12} mt={3}>
              <Grid container justifyContent="center">
              <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={handleOpen}
                    sx={{fontSize:"15px"}}
                  >
                    <AddAPhotoIcon sx={{fontSize:"50px"}}/><br></br>
                    Add Images
                  </IconButton>



                  {/* <Button onClick={handleOpen}>Open modal</Button> */}
                  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{borderRadius:"10px"}}
      >
        <Fade in={open}>
          <Box sx={style}>
          <label htmlFor="icon-button-file">
          <h1 style={{ fontFamily: "Goudy Old Style", fontWeight: "bolder", color:"#1976d2" }}>Image Upload Window</h1>
                  <input
                    accept="image/*"
                    id="images"
                    name="images"
                    type="file"
                    onChange={handleImageUpload}
                    multiple
                  />
                  <Box sx={{ minWidth: 120, mt: "10px" ,mb:"10px"}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="category"
                        id="category"
                        value={category}
                        label="Category"
                        onChange={handleCategoryUploadChange}
                      >
                        <MenuItem value={"Birds"}>Birds</MenuItem>
                        <MenuItem value={"Beaches"}>Beaches</MenuItem>
                        <MenuItem value={"Mountains"}>Mountains</MenuItem>
                        <MenuItem value={"Bikes"}>Bikes</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button color="primary"
                    aria-label="upload picture"
                    component="span"
                    variant="contained"
                    type="submit"
                    onClick={()=>{
                      handleClose();
                      handleAddImage()}}>Add Photo</Button>
                </label>
          </Box>
        </Fade>
      </Modal>
              </Grid>
            </Grid>
            <Grid item xs={12} m={5}>
              <Grid container spacing={2} justifyContent="center">
                {filteredData.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} xl={3} className="wrapper-images">
                    <ImageListItem
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid black",
                        position: "relative",
                      }}
                    >
                      {/* ________________Image rename and delete Buttons start______________ */}
                      <Grid
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                      <React.Fragment>
                        <Button
                          onClick={() => {openEditSlider(item);
                          toggleDrawer('left',true)}}
                          style={{ position: "absolute" }} 
                        >
                          <EditIcon />
                        </Button>
                        <Drawer
                        BackdropProps={{ invisible: true }}
                        anchor='left'
                        open={sliderState['left']}
                        onClose={()=>toggleDrawer('left', false)}
                        >
                        {list('left',item.imageName)}
                       </Drawer>
          </React.Fragment>
                      </Grid>
                      <Grid
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          style={{ position: "absolute" }}
                          onClick={() => removeImage(item.imageName)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                      {/* ________________Image rename and delete Buttons end______________ */}
                      {
                        
                        <img
                          src={item.imageUrlName}
                          alt={item.imageTag}
                          loading="lazy"
                          style={{ cursor: "pointer" }}
                          onClick={()=>handleClick(item,index)}
                        />
                        
                      }
                    </ImageListItem>
                  </Grid>
                ))}
                {clickedImg&&(<Modals clickedImg={clickedImg} setClickedImage={setClickedImage}/>)}
                
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    </div>
  );
}

export default Album;
