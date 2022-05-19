import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Appbar from "./Components/Appbar";
import Signup from "./Components/Signup";

import Album from  "./Components/Album"
import { ImagesProvider } from "./Context/ImagesContext";
function App() {
  return (
   <div>
   
   <ImagesProvider>
    <BrowserRouter>
      <Appbar/>
      <Routes>
        <Route index exact path="/" element={<Navigate replace to="login"/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="signup" element={<Signup/>}></Route>
        <Route path="album" element={<Album/>}></Route>

      </Routes>
    </BrowserRouter>
    </ImagesProvider>
   
   </div>
  );
}

export default App;
