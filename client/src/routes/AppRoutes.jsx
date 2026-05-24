import {BrowserRouter , Routes , Route} from "react-router-dom";
import React from 'react'
import Home from "../pages/Home";
import Room from "../pages/Room";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/room/:roomId" element={<Room/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes