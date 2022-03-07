import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoguot } from '../../actions/auth';
import { eventLogoutClearn } from '../../actions/events';

export const Navbar = () => {
  
  const {name}= useSelector(state=>state.auth);


  const dispatch = useDispatch();

  const handleLogout =()=>{
    dispatch(startLoguot());
    dispatch(eventLogoutClearn());
  }

  return (


       <div className="navbar navbar-dark bg-dark mb-4 ">
         
          <span className="navbar-brand">
              {name}
          </span>

          <button className="btn btn-outline-danger " onClick={handleLogout}>
              <i className="fa fa-sign-out-alt"></i>
              <span> Salir</span>
          </button>
          
       </div>


   
  )
} 


