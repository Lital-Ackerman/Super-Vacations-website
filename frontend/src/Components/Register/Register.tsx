import React from 'react';
import "./Register.css";
import { useForm } from 'react-hook-form';
import axios from "axios";
import {NavLink, useNavigate} from 'react-router-dom';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setAdmin, setName, setUser, setFollow, setList } from "../../actions";
import { getVacations } from "../../Services/methods";
import Vacation from '../../Model/vacation-model';
import SocketService from "../../Services/socket-service";




function Register() {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const navigate= useNavigate();
    const dispatch = useDispatch();

    const goRegister=async(registerInfo:any)=>{
        try{
            const responseRegister= await axios.post("http://localhost:4000/users/register", registerInfo);
            console.log(responseRegister);
            console.log(registerInfo)
            const myUser= {"username": registerInfo.userName, "password": registerInfo.password}
            const responseLogin = await axios.post("http://localhost:4000/users/login", myUser);
            localStorage["loginData"] = JSON.stringify(responseLogin.data.token);

            dispatch(setName(registerInfo.userName));
            dispatch(setUser());
            const myList:Vacation[]|undefined= await getVacations();
            if(myList) dispatch(setList(myList, []));
            alert(`Congratulations ${registerInfo.userName}! you are registered`);
            SocketService.connect();
            navigate("/vacationsDisplay")
        }
        catch(err: any){
            console.log(err)
            console.log(err.message)
            let message= JSON.stringify(err.response.data, null, " ")
            alert(`Server Error: ${message}`)
        }
    }

  return (
      <div className='registerDiv'>
        <form onSubmit={handleSubmit(goRegister)}>
            <h1>Registration</h1>
            <label>First Name:</label>
            <input maxLength={50} className='form-control' type="text" {...register("firstName", {required:true})}/>
            {errors.firstName && <p>First name is required</p>}<br/>

            <label>Last Name:</label>
            <input maxLength={50} className='form-control' type="text" {...register("lastName", {required:true})}/>
            {errors.lastName && <p>Last name is required</p>}<br/>

            <label>Username:</label>
            <input maxLength={50} className='form-control' type="text" {...register("userName", {required:true})}/>
            {errors.userName && <p>Username is required</p>}<br/>

            <label>Password:</label>
            <input maxLength={20} className='form-control' type="password" {...register("password", {required:true})}/>
            {errors.password && <p>password is required</p>}<br/>

            <button className="btn btn-info"  type="submit">Submit</button>

        </form>        
    </div>
  )
}

export default Register;