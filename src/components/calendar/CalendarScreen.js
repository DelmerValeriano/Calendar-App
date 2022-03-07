import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';//es una libreria de fechas
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messagesEspañol';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector} from 'react-redux';
import { uiOpenModal } from '../../actions/ui';


//cambiar el idioma de moment a español
import 'moment/locale/es';
import { eventClearActiveEvent, eventsSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeletedEventFab } from '../ui/DeletedEventFab';
moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView')|| 'month');
  const {events,activeEvents}= useSelector(state=>state.calendar);
  const {uid}= useSelector(state=>state.auth);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(eventStartLoading());
    
  }, [dispatch])


  const eventsStyleGetter=(events,start,end,isSelected) => {


    const style={
      backgroundColor:(uid===events.user._id) ? '#367CF7' :'#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
     
    }
    return {style};
  }


  const onDoubleClick=(e)=>{

    dispatch(uiOpenModal());

  }

  const onSelectEvent=(e)=>{
     dispatch(eventsSetActive(e));
    

   

  }
  const onViewChange = (e)=>{
    setLastView(e);
    localStorage.setItem('lastView',e);
    
  }
  const onSelectSlot=(e)=>{
    dispatch(eventClearActiveEvent())

  }


  return (
    <div className="calendar-screen">
        <Navbar/>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          //esto le agregue las funcionalidades 
          messages={messages}
          eventPropGetter={eventsStyleGetter}
          components={{
            event:CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
          onSelectSlot={onSelectSlot}
          selectable={true}

        />
        {

          (activeEvents) &&  <DeletedEventFab/>
        }
        
        <CalendarModal/>
        <AddNewFab/>


    </div>
  )
}
