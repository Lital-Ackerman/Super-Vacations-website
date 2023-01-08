import React, { SyntheticEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./SingleVacation.css"
import { useSelector, useDispatch } from 'react-redux';
import { followV, setList, unFollowV } from '../../actions';
import jwtAxios from '../../Services/JwtAxios';
import Vacation from '../../Model/vacation-model';

interface singleProps{
vacationInfo:Vacation;
username:string;
}


function SingleVacation(props: singleProps) {
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const followUp = useSelector((state: any) => state.followUp);
  const whoUser = useSelector((state: any) => state.whoUser);
  const dispatch = useDispatch();
  const [fChecked, setFChecked]= useState(false)
  let vInfo= props.vacationInfo;
  let vId: any= props.vacationInfo.vacationID;
  
  useEffect(()=>{

    //Mark follow button according to  user last login.
    if (followUp.length>0){
    let isExist= followUp.find((id: number)=> id==vId);
    if(isExist) setFChecked(true);
    }
  }, [])

//Mark follow button
  const follow= async(vInfo: Vacation)=>{
    try{
    setFChecked(!fChecked)
    let idToFollow= vId;
    const response= await jwtAxios.patch(`http://localhost:4000/vacations/patch/${idToFollow}`, {followers: vInfo.followers, operator: !fChecked ? "+" : "-"})

    !fChecked
      ?  dispatch(followV(vId))
      :  dispatch(unFollowV(vId));
    }
    catch(err:any){
      let message= JSON.stringify(err.response.data, null, " ");
      alert(message);
      if(err.response.data=="Your login session has expired")
        window.location.reload()
    }
  }

//Delete vacation
  const deleteV= async(event:SyntheticEvent)=>{
    try {
      const idToDelete= (event.target as HTMLButtonElement).value;
      const response= await jwtAxios.delete(`http://localhost:4000/vacations/delete/${idToDelete}`)
      dispatch(unFollowV(vId));
    } 
    catch (err:any) {
      let message= JSON.stringify(err.response.data, null, " ");
      alert(message);
      if(err.response.data=="Your login session has expired")
        window.location.reload() 
    }
  }

//Convert date to other format.
  const dateConvert=(dateTime: string)=>{
    let dt= new Date(dateTime).toLocaleString('en-GB').substring(0, 10);
    return dt
  }


  return (
    <div className='singleVDiv'>

      <div className='imgContainer'>
        <div className='userActions'>
          {!isAdmin && <button className={fChecked?'followBtn bi bi-hand-thumbs-up-fill': 'followBtn bi bi-hand-thumbs-up'} type="button" onClick={()=>follow(vInfo)}></button>}
          {isAdmin && <button className="bi bi-x-circle-fill" value= {vId} onClick={deleteV}></button>}
          {isAdmin && <NavLink to={`/editVacation/${vId}`} state={{vInfo}} className="bi bi-pencil-fill"></NavLink>}<br/><br/>
        </div>
        <img className="vImg" alt={vInfo.destination} src={`http://localhost:4000/images/${vInfo.image}`}></img> 
      </div>
      
      <div className='mainInfo'>
      <h2>{vInfo.destination}</h2> 
      <p><span>Description:</span> {vInfo.description}</p> 
       <p><span>Price:</span> {vInfo.price} $</p> 
       <p><span>Dates:</span> {dateConvert(vInfo.startDate)} -  {dateConvert(vInfo.endDate)} </p> 
       <span className='followersCircle'>{vInfo.followers}</span>       
       </div>

       </div>
  )
}

export default SingleVacation

