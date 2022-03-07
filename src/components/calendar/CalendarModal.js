import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector,useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdtate } from '../../actions/events';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const Fechainicial = moment().minute(0).seconds(0).add(1,'hour');
const FechaFinal = Fechainicial.clone().add(1,'hour');

const initEvent={
    title:'',
    notes: '',
    start: Fechainicial.toDate(),
    end: FechaFinal.toDate()

}

export const CalendarModal = () => {
    const [dateStart, SetdateStart] = useState(Fechainicial.toDate());
    const [dateEnd, setDateEnd] = useState(FechaFinal.toDate());
    const [titleValido, setTitleValido] = useState(true);
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvents} = useSelector(state => state.calendar);


    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState(initEvent);

    const {title,notes,start,end} =formValue;
    


    useEffect(() => {
        if (activeEvents) {
            setFormValue(activeEvents);
            
        }else{
            setFormValue(initEvent);

        }



    },[activeEvents,setFormValue])

    const hadleInputChanged =({target})=>{
        setFormValue({
            ...formValue,
            [target.name]: target.value
        });

    }

    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValue(initEvent);

       
    }

    const handleStartDateChange=(e)=>{
        SetdateStart(e);
        setFormValue({
            ...formValue,
            start: e
        });
 
        
       
    }  
    const handleEndtDateChange=(e)=>{
        setDateEnd(e);
        setFormValue({
            ...formValue,
            end: e
        });


    }
    const hadleSubmit=(e)=>{
        e.preventDefault();

        const momenStart =moment(start);
        const momenEnd =moment(end);
        if (momenStart.isSameOrAfter(momenEnd)) {
           Swal.fire('Error','La fecha fin debe de ser mayor a la fecha inicio','error')
            return;
            
        }
        if (title.trim().length < 2) {
            return setTitleValido(false);
            
        }

        if (activeEvents) {
            dispatch(eventStartUpdtate(formValue));
            
        }else {

            dispatch(eventStartAddNew(formValue));
        }
        //realizar la conexion de la base de datos

        setTitleValido(true);
        closeModal();




    }




  return (
    <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}

        
    >
        <h1> { (activeEvents) ? 'Editar evento'  : 'Nuevo evento'} </h1>
        <hr />
        <form className="container" onSubmit={hadleSubmit} >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker className="form-control" onChange={handleStartDateChange} value={dateStart} />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker className="form-control" onChange={handleEndtDateChange} minDate={dateStart} value={dateEnd} />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${!titleValido && 'is-invalid'}  `}
                    placeholder="Título del evento"
                    name="title"
                    value={title}
                    onChange={hadleInputChanged}
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>
            <br/>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={hadleInputChanged}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>
            <div className="d-grid gap-2">
                <button
                    type="submit"
                    className="btn btn-outline-primary  gap-2"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </div>
        </form>
    </Modal>


            


  )
}
