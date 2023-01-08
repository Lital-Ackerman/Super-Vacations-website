import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavigationLinks from "./Components/NavigationLinks/NavigationLinks";
import Routing from "./Components/Routing/Routing";
import { useDispatch } from 'react-redux';
import SocketService from "./Services/socket-service";
import { ToastContainer } from "react-toastify";
import { setAdmin, setName, setUser, setFollow, setList } from './actions';
import axios, { AxiosError } from "axios";
import Vacation from "./Model/vacation-model";
import { getVacations } from "./Services/methods";
import { getFollowedVacations } from "./Services/methods";


function App() {
  const dispatch= useDispatch();

  useEffect(()=>{
    //Login automatically if last token is valid
  const isAuthorized = async()=> {
    try{
      if(localStorage.loginData){
        const lastUserToken:string= JSON.parse(localStorage.loginData);
        const response= await axios.post("http://localhost:4000/users/autoLogin", {lastUserToken});
        if (response.data!="token not valid"){
        let myUser= response.data;
        dispatch(setName(myUser.userName));
        myUser.isAdmin==1
            ?dispatch(setAdmin())
            :dispatch(setUser())      
        const followedVacations:number[]= await getFollowedVacations(myUser.userID)
        followedVacations ? dispatch(setFollow(followedVacations)) :  dispatch(setFollow([]))
        const myList:Vacation[]|undefined= await getVacations();
        if(myList) dispatch(setList(myList, followedVacations));
        alert(`Welcome Back ${myUser.userName}!`)
        SocketService.connect();
        }
      }
    }
    catch(err:any){
      console.log(err.response.data)
    }
       }
  isAuthorized();
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
      <header className="sticky-top"><NavigationLinks/></header>
      <main><Routing /></main>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
