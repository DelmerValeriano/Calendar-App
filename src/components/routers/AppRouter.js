import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { startChecking } from '../../actions/auth';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

   const dispatch =useDispatch();
   const {cheking}= useSelector(state=>state.auth);


   useEffect(() => {
        //cuadno usamos una funcion fuera de de esta vista no es necesario ponerla como dependencia
       dispatch(startChecking());
     
   }, [dispatch])
   
   if (cheking) {
       return <h5>Espere...</h5>
       
   }



  return (
        <Router>
            <div>
                <Routes>
                    <Route 
                        path="/login"  
                        element={
                            <PublicRoute>
                                <LoginScreen/>
                            </PublicRoute>
                        }           
                    />
                    <Route 
                        path="/"  
                        element={
                            <PrivateRoute>
                                <CalendarScreen/>
                            </PrivateRoute>

                        }
                    />





                    <Route path='*' element={<Navigate replace to='/' /> } />

                </Routes>
            </div>
        </Router>
 )
} 


          
