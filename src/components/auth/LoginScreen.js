import React from 'react';
import { useDispatch } from 'react-redux';
import { starLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import Swal from "sweetalert2";

import './login.css';


export const LoginScreen = () => {

    const dispatch= useDispatch();

    //login

    const [formLoginValue,hadleLoginInputChanged] = useForm({
        lEmail: 'delmer_Valeriano@yahoo.com',
        lPassword: '123456'


    });

    const {lEmail,lPassword} = formLoginValue;

    const hadleLogin=(e)=>{
        e.preventDefault();
      
        dispatch(starLogin(lEmail,lPassword))

    }
    //registro
    const [formRegisterValue,hadleRegisterInputChanged] = useForm({
        rName: "Alberto",
        rEmail: 'Alberto_Valeriano@yahoo.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });
    const {rName,rEmail,rPassword1,rPassword2} = formRegisterValue;

    const hadleRegister =(e)=>{
        e.preventDefault();

        if (rPassword1 !== rPassword2) {
            
            return Swal.fire('Error','Las Contraseñas deben de ser iguales','error');
        }
        
        dispatch(startRegister(rName,rEmail,rPassword1));
    }









    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={hadleLogin}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={hadleLoginInputChanged}

                            />
                        </div>

                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={hadleLoginInputChanged}

                            />
                        </div>

                        <div className="form-group centrar">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={hadleRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={hadleRegisterInputChanged}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={hadleRegisterInputChanged}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={rPassword1}
                                onChange={hadleRegisterInputChanged}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={hadleRegisterInputChanged}
                            />
                        </div>

                        <div className="form-group centrar">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}