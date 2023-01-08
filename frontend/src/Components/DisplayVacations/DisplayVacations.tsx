import React, { useEffect, useState } from "react";
import SingleVacation from "../SingleVacation/SingleVacation";
import "./DisplayVacations.css";
import { useSelector, useDispatch } from "react-redux";
import { setList, unFollowV } from "../../actions";
import { NavLink } from "react-router-dom";
import Vacation from "../../Model/vacation-model";
import SocketService from "../../Services/socket-service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToDB } from "../../Services/methods";

function DisplayVacations() {
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const followUp = useSelector((state: any) => state.followUp);
  const whoUser = useSelector((state: any) => state.whoUser);
  const vList:Vacation[] = useSelector((state: any) => state.vList);
  const dispatch = useDispatch();

  useEffect(() => {

    updateIfDeletedByManager(vList);
    setToDB(followUp, whoUser);

    SocketService.socket?.on("vacations-update", myUpdate=>{
    let newList= myUpdate.updatedList;
    let newUpdate= myUpdate.updateMessage;
    updateIfDeletedByManager(newList);
    dispatch(setList(newList, followUp));
    let notify = () => {toast.info(newUpdate,{toastId: "lital", theme: "dark", autoClose: 4000})}
      if (newUpdate!="followers Update!") notify();
    }
  )
  }, [followUp]);

  const updateIfDeletedByManager=(list:Vacation[])=>{
  let idNewList:number[]=[];
  list.forEach((v:Vacation) => {if(v.vacationID) idNewList.push(v.vacationID)});
  followUp.forEach((id:number) => {if(idNewList.includes(id)==false) dispatch(unFollowV(id));
  });
}


  return (
    <div className="displayDiv">
      {isAdmin &&<h1>Hey Admin, Here is Your Vacations List:</h1>}<br/>
      {isAdmin && <NavLink className="bi bi-plus-circle-fill linkAdd" to="/addVacation"> Add Vacation</NavLink>}
      {!isAdmin &&<h1>Choose & Flight- Super Vacations Just For You:</h1>}<br/>
      {!isAdmin && (<h4>Click <span className="bi bi-hand-thumbs-up" /> to follow vacation</h4>)}
      
      <div className="vacationsDiv">  
      {vList.length== 0 && <h3>No Vacations to Display.... <i className="bi bi-emoji-frown"></i></h3>}
        {vList && vList.length > 0 && vList.map((v) => (
        <div className="card" key={v.vacationID}>
            <SingleVacation vacationInfo={v} username={whoUser}/>
        </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayVacations;

