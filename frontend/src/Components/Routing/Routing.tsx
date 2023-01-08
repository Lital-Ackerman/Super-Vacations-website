import path from 'path';
import { Route } from 'react-router';
import { Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import AddVacation from '../AddVacation/AddVacation';
import DisplayVacations from '../DisplayVacations/DisplayVacations';
import EditVacation from '../EditVacation/EditVacation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import "./Routing.css";
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Home/Home';
import { redirect } from 'react-router';
import Reports from '../Reports/Reports';





function Routing() {
  const whoUser = useSelector((state: any) => state.whoUser);
  const isAdmin = useSelector((state: any) => state.isAdmin);

    return (
      <div className='routesDiv'>
  <Routes>
      <Route path='/home'  element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      {whoUser !="guest" && <Route path='/vacationsDisplay' element={<DisplayVacations/>}/>}
      {isAdmin== true &&<Route path='/addVacation' element={<AddVacation/>}/>}
      {isAdmin== true && <Route path='/editVacation/:vacationInfo' element={<EditVacation/>}/>}
      {isAdmin== true && <Route path='/reports' element={<Reports/>}/>}
      <Route path="/logout" element={<Navigate to ="/home"/>}/>
      <Route path='*' element={<Navigate to="/home"/>}/>
  </Routes>
  </div>
    )
  }
  
  export default Routing;