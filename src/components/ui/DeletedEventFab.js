import React from 'react'
import { useDispatch } from 'react-redux'
import {  eventStartDelete } from '../../actions/events'

export const DeletedEventFab = () => {

  const dispatch =useDispatch()

  const hadleDelete = ()=>{
    dispatch(eventStartDelete());
    


  }
  return (
    <button className="btn btn-danger fab-danger" onClick={hadleDelete}>
        <i className="fas fa-trash"></i>
        <span> Borrar evento</span>

    </button>
  )
}
