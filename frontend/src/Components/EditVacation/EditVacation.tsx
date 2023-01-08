import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Vacation from "../../Model/vacation-model";
import jwtAxios from "../../Services/JwtAxios";
import "./EditVacation.css"

function EditVacation() {

  //Selected vacation details
  const location = useLocation();
  const { vInfo } = location.state;
  console.log(vInfo);
  console.log(vInfo.image);
  const idToEdit = vInfo.vacationID;
  console.log(idToEdit);


  
  const {register, handleSubmit, formState: { errors }} = useForm<Vacation>();
  const navigate = useNavigate();

  //Put request for editing vacation
  const editVacation = async (editedDetails: Vacation) => {
    try {
      console.log(editedDetails);
      const myFormData= new FormData();
      myFormData.append("destination", editedDetails.destination);
      myFormData.append("description", editedDetails.description);
      myFormData.append("price", String(editedDetails.price));
      myFormData.append("image", editedDetails.image[0]);
      myFormData.append("startDate", editedDetails.startDate);
      myFormData.append("endDate", editedDetails.endDate);
      const response = await jwtAxios.put<Vacation>(`http://localhost:4000/vacations/edit/${idToEdit}`, myFormData);
      console.log(response.data);
      alert(`Vacation has been edited successfully`);
      navigate("/vacationsDisplay");
    } 
    catch (err: any) {
      let message= JSON.stringify(err.response.data, null, " ");
      alert(message)
      if(err.response.data=="Your login session has expired")
        window.location.reload() 
    }
  };

  //Set date for default date value
  const setDate = (date: any) => {
    let myDate = new Date(date);
    myDate.setDate(myDate.getDate() + 1);
    let setDate = myDate.toISOString().substring(0, 10);
    return setDate;
  };

  return (
    <div className="editVacationDiv">
      <form onSubmit={handleSubmit(editVacation)}>
        <h1>Edit Vacation</h1>
        <label>Destination:</label>
        <input maxLength={50} className="form-control" type="text" defaultValue={vInfo.destination} 
        {...register("destination", { required: true })}/>
        {errors.destination && <p>Destination is required</p>}<br/>

        <label>Description:</label>
        <textarea maxLength={150} className="form-control" defaultValue={vInfo.description}
        {...register("description", { required: true })}/>
        {errors.description && <p>Description is required</p>}<br/>

        <label>Price:</label>
        <input className="form-control" type="number" defaultValue={vInfo.price}
          {...register("price", { required: true })}/>
        {errors.price && <p>Price is required</p>}<br/>

        <label>Image:</label>
        <input className="form-control" type="file" 
          {...register("image", { required: true })}/>
        {errors.image && <p>Image is required</p>}<br/>

        <label>Start Date:</label>
        <input className="form-control" type="date" defaultValue={setDate(vInfo.startDate)}
          {...register("startDate", { required: true })} />
        {errors.startDate && <p>Start Date is required</p>} <br />

        <label>End Date:</label>
        <input
          className="form-control" type="date" defaultValue={setDate(vInfo.endDate)}
          {...register("endDate", { required: true })} /> {errors.endDate && <p>End Date is required</p>}<br />

        <button className="btn btn-warning" type="submit">Edit</button><br /><br />
        <NavLink to="/vacationsDisplay">Back to My Vacations</NavLink>
      </form>
    </div>
  );
}

export default EditVacation;
