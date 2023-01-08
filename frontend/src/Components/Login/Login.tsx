import React  from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin, setName, setUser, setFollow, setList } from "../../actions";
import Vacation from "../../Model/vacation-model";
import SocketService from "../../Services/socket-service";
import { getVacations } from "../../Services/methods";
import { getFollowedVacations } from "../../Services/methods";

// getVacations()
function Login() {
  const whoUser = useSelector((state: any) => state.whoUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors },} = useForm();

  const isRegister = async (loginDetails: any) => {
    try {
      const response = await axios.post("http://localhost:4000/users/login",loginDetails);
      localStorage["loginData"] = JSON.stringify(response.data.token);
      const myUser = response.data;
      dispatch(setName(myUser.userName));
      myUser.isAdmin == 1 ? dispatch(setAdmin()) : dispatch(setUser());
      const followedVacations= await getFollowedVacations(myUser.userID)
      followedVacations ? dispatch(setFollow(followedVacations)) :  dispatch(setFollow([]))
      const myList:any= await getVacations();
      dispatch(setList(myList, followedVacations))
      alert(`Welcome ${myUser.userName}!`);
      SocketService.connect();
      navigate(`/vacationsDisplay`);
    } 
    catch (err: any) {
      let message = JSON.stringify(err.response.data, null, " ");
      console.log("NOT REGISTER");
      alert(message);
    }
  };

  return (
    <div className="loginDiv">
      <form onSubmit={handleSubmit(isRegister)}>
        
        <h1>Login</h1>
        <NavLink to="/register">Not Registered? click here to register</NavLink><br/><br/>

        <label>UserName:</label>
        <input maxLength={50} className="form-control" type="text" {...register("username", { required: true })}/>
        {errors.username && <p>UserName is required</p>}<br />

        <label>Password:</label>
        <input maxLength={20} className="form-control" type="password" {...register("password", { required: true })}/>
        {errors.password && <p>password is required</p>}<br />
        
        <button className="btn btn-primary" type="submit">Submit</button><br /><br />
        
      </form>
    </div>
  );
}

// module.exports= {
//   getVacations,
//   getFollowedVacations
// }
export default Login;
