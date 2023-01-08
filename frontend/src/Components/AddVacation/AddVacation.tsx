import React from 'react'
import { useForm } from 'react-hook-form';
import "./AddVacation.css"
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Vacation from '../../Model/vacation-model';
import jwtAxios from '../../Services/JwtAxios';
function AddVacation() : JSX.Element{

const {register, handleSubmit, formState:{errors}}= useForm<Vacation>();
const navigate=useNavigate();

const insertVacation=async(vacationDetails:Vacation)=>{
    try{
      const myFormData= new FormData();
      myFormData.append("destination", vacationDetails.destination);
      myFormData.append("description", vacationDetails.description);
      myFormData.append("price", String(vacationDetails.price));
      myFormData.append("image", vacationDetails.image[0]);
      myFormData.append("startDate", vacationDetails.startDate);
      myFormData.append("endDate", vacationDetails.endDate);

      const response= await jwtAxios.post<Vacation>("http://localhost:4000/vacations/insert", myFormData);
      alert(`Vacation has been added successfully`)
      navigate(`/vacationsDisplay`);
    }
    catch(err:any){
      let message= JSON.stringify(err.response.data, null, " ");
      console.log("can't post your vacation");
      alert(message);
      if(err.response.data=="Your login session has expired")
        window.location.reload()     
      }
    }

    return (
    <div className='addVacationDiv'>
    <form onSubmit={handleSubmit(insertVacation)}>
      <h1>Add Vacation</h1>
      <label>Destination:</label>
      <input maxLength={50} className='form-control' type="text" {...register("destination", {required:true})}/>
      {errors.destination && <p>Destination is required</p>}<br/>

      <label>Description:</label>
      <textarea  maxLength={150} className='form-control' {...register("description", {required:true})}/>
      {errors.description && <p>Description is required</p>}<br/>

      <label>Price:</label>
      <input className='form-control' type="number" {...register("price", {required:true})}/>
      {errors.price && <p>Price is required</p>}<br/>

      <label>Image:</label>
      <input className='form-control' type="file" {...register("image", {required:true})}/>
      {errors.image && <p>Image is required</p>}<br/>

      <label>Start Date:</label>
      <input className='form-control' type="date" {...register("startDate", {required:true})}/>
      {errors.startDate && <p>Start Date is required</p>}<br/>

      <label>End Date:</label>
      <input className='form-control' type="date" {...register("endDate", {required:true})}/>
      {errors.endDate && <p>End Date is required</p>}<br/>

      <button className="btn btn-info"  type="submit">Submit</button><br/><br/>
      <NavLink to="/vacationsDisplay">Back to My Vacations</NavLink>
    </form>  

    </div>
  )
}

export default AddVacation