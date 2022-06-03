

export const addUser =  (newUser) => {
    
    return async function (dispatch){
    const usernameResponse = await fetch(
      `http://localhost:4000/loginuser?userName=${newUser.userName}`
    );
    if (usernameResponse.ok) {
      const userResData = await usernameResponse.json();
      if (userResData.length === 0) {
        const emailResponse = await fetch(
          `http://localhost:4000/loginuser?email=${newUser.email}`
        );
        if (emailResponse.ok) {
          const emailResData = await emailResponse.json();
          if (emailResData.length === 0) {
            const methods = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newUser),
            };
            const regResponse = await fetch(
              "http://localhost:4000/loginuser",
              methods
            );

            if (regResponse.ok) {
              alert("Signup Successful");
              dispatch({type:"signupstatus"})
              

            }
          } else {
            alert("Email id already exists");
          }
        }
      } else {
        alert("Username not available");
      }
    }
  }
  };

 export const loginUser = (loginData) => {
   return async function (dispatch){
    const loginResponse = await fetch(
      `http://localhost:4000/loginuser?userName=${loginData.userName}&password=${loginData.password}`
    ,{method:"GET"});
    if (loginResponse.ok) {
      const loginResData =await loginResponse.json();

      if (loginResData.length === 0) {
        const loginResponseRepeat = await fetch(
          `http://localhost:4000/loginuser?email=${loginData.userName}&password=${loginData.password}`
          ,{method:"GET"});
        if (loginResponseRepeat.ok) {
          const loginResponseRepeatData = await loginResponseRepeat.json();
          if (loginResponseRepeatData.length === 0) {
            alert("Please check your login credentials");
          } else {
              
            const photosDataResponse=await fetch("http://localhost:5000/extract",{method:"GET"})
            if(photosDataResponse.ok){
              const PhotosData=await photosDataResponse.json()
              
              if(PhotosData.length>0)
              {
                console.log(PhotosData)
                localStorage.setItem("albumLogin",JSON.stringify(true))
                localStorage.setItem("albumData",JSON.stringify(PhotosData))
                dispatch({type:"loginstatus"})
                dispatch({type:"showalbum",payload:PhotosData})
              }
            }
          }
        }
      } else {
        localStorage.setItem("albumLogin",JSON.stringify(true))
        dispatch({type:"loginstatus"})
      }
    }
  }
  };   

export const Logout=(dispatch)=>{
    dispatch ({type:"logout"})
}

