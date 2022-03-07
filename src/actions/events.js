import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew=(event)=>{
    return async(dispatch,getState)=>{


        const {uid,name} =getState().auth;
        try {
            const resp= await fetchConToken('events',event,'POST');
            const body = await resp.json();
            
            if (body.ok) {
                event.id =body.evento.id;
                event.user={
                    _id:uid,
                    name:name

                }
                dispatch(eventsAddNew(event));

            }
            
        } catch (error) {

            console.log(error);
            
        }

       

    }
}

//esta funcion solo si se guarda en la base de datos
const eventsAddNew = (event)=>({
    type:types.eventAddNew,
    payload:event
});

export const eventsSetActive = (event)=>({
    type:types.eventSetActive,
    payload:event
});


export const eventClearActiveEvent=()=>({
   type:types.eventClearActiveEvent,
});


export const eventStartUpdtate=(event)=>{

    return async(dispatch)=>{

        try {
           
    
            const resp =await  fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();
            console.log(body);

            if (body.ok) {
                dispatch(eventUpdated(event));
                
            }else{
                Swal.fire('Error',body.msg,'error')
            }
    
    
    
            
        } catch (error) {
            console.log(error);
        }

    }



}


const eventUpdated=(event)=>({
    type:types.eventUpdated,
    payload:event

});



export const  eventStartDelete =()=>{
    return async(dispatch,getState)=>{

        const {id}= getState().calendar.activeEvents;

        try{
            const resp =await  fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();


            if (body.ok) {
                dispatch(eventDelete());
                
            }else{
                Swal.fire('Error',body.msg,'error')
            }



            
        } catch (error) {
            console.log(error);
        }




    }
}

const eventDelete=()=>({type: types.eventDeleted});



export const eventStartLoading = ()=>{
    return async (dispatch)=>{

       try {
           const resp = await fetchConToken('events');
           const body = await resp.json();

           const event= prepareEvents(body.eventos);

 
           dispatch(eventsLoaded(event));
            

       } catch (error) {
           console.log(error);
       }
    }
}


const eventsLoaded=(event)=>({
    type:types.eventLoaded,
    payload:event
})


export const eventLogoutClearn = ()=>({
    type:types.eventLogout,
})