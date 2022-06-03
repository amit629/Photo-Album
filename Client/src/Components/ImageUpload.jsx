import {
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Box } from "@mui/system";
function ImageUpload(props) {
  const [imageFile, setImageFile] = useState();
  const [imageName, setImageName] = useState();
  const [category, setCategory] = React.useState("");
  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleAddImage = async() => {
    const data = new FormData();
    data.append("image", imageFile);
    data.append("category",category)    
    const response=await fetch("http://localhost:5000/single", {
      method: "POST",
      body: data,
    })

    if(response.ok){
      console.log("File uploaded Successfully")

    }
    else
    {
      console.log("Something went wrong")
    }

    
  };


  return (
    <>
      <Grid item xs={12} mt={3}>
        <Grid container justifyContent="center">
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="image"
              name="image"
              type="file"
              onChange={handleImageUpload}
            />
            <Box sx={{ minWidth: 120 }}>
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
                  onChange={handleChange}
                >
                  <MenuItem value={"Birds"}>Birds</MenuItem>
                  <MenuItem value={"Beaches"}>Beaches</MenuItem>
                  <MenuItem value={"Mountains"}>Mountains</MenuItem>
                  <MenuItem value={"Bikes"}>Bikes</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleAddImage}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </>
  );
}
export default ImageUpload;
