import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAdmin, setName, setUser } from "../../actions";
import UpdateService from "../../Services/socket-service";
import "./NavigationLinks.css"
import axios from "axios";
import SocketService from "../../Services/socket-service";
import { toast, ToastContainer } from "react-toastify";
import jwtAxios from "../../Services/JwtAxios";

function NavigationLinks() {
  const whoUser = useSelector((state: any) => state.whoUser);
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const followUp = useSelector((state: any) => state.followUp);
  const vList = useSelector((state: any) => state.vList);
  const dispatch = useDispatch();
const logoImg=require("../../assets/logo.png")
const [expanded, setExpanded] = useState(false);


  
  const logout = () => {
    dispatch(setName("guest"));
    dispatch(setUser());
    localStorage.removeItem("loginData");
    SocketService.disconnect();
  };

  
  //Links will close navbar when in the collapse state.

  const collapseNavBar=()=>{    
    const btnCollapse = document.getElementById("doCollapse") as HTMLButtonElement;
    if(window.innerWidth<769)
      btnCollapse.click();
  }
    
  return (

    <div className="topPanel" >

    <nav  className="navbar navbar-dark bg-dark navbar-expand-md" >
    <div className="container-fluid" onClick={collapseNavBar}>

    <div className="logoDiv navbar-brand">
      <img className="logo" alt="myLogo" src={logoImg}/>
      <span>Super Vacation</span> 
    </div>
    
    <button className="navbar-toggler" id="doCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" >
    <div className="navbar-nav" >
        <NavLink className="nav-link" to="/home" >Home</NavLink>
      {whoUser == "guest" &&<NavLink  className="nav-link" to="/register">SignUp</NavLink>}
      {whoUser == "guest" && <NavLink className="nav-link" to="/login">Login</NavLink>}
      {whoUser != "guest" && <NavLink className="nav-link" to="/logout" onClick={logout}>Logout</NavLink>}
      {whoUser != "guest" && <NavLink className="nav-link" to="/vacationsDisplay">My Vacations</NavLink>}
      {isAdmin  && <NavLink className="nav-link" to="/reports">Reports</NavLink>}
    </div> 
  </div>
  </div>
  </nav>
  <h3 className={whoUser == "guest" ? "bi bi-person-dash helloUser" :"bi bi-person-circle helloUser"}>  Hello {whoUser}</h3><br/><br/> 


    </div>
  );
}

export default NavigationLinks;

