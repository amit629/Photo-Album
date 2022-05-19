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
            
            dispatch({type:"loginstatus"})
            alert("Login Successfull");
          }
        }
      } else {
        alert("Login Successfull");
        dispatch({type:"loginstatus"})
      }
    }
  }
  };   

export const Logout=(dispatch)=>{
    dispatch ({type:"logout"})
}