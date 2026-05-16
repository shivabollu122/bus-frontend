import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddRoutes = () => {

  let [busdata,setbusdata] = useState({bus_no:"",from:"",to:"",type:"",stops:["","","","","",""],frequency_mins:"",first_bus:"",last_bus:""});


  let handle=(e)=>{
    setbusdata({...busdata,[e.target.name]:e.target.value});
  }

  let handleStops=(index,value)=>{
     let updated = [...busdata.stops];
     updated[index] = value;

     setbusdata({...busdata,stops:updated});
  }

  let add=async()=>{
    await axios.post("https://bus-finder-backend.onrender.com/db",busdata);
  }

  let nav = useNavigate();


  let handlehome=()=>{
    setTimeout(()=>{
      nav("/");
    },500)
  }
  let handleroutes=()=>{
    setTimeout(()=>{
      nav("/routes");
    },500)
  }

  let handleAdd=async()=>{
    if(busdata.busno!="" && busdata.from!="" && busdata.to!="" && busdata.stops.length>0 && busdata.type!="" && busdata.first_bus!="" && busdata.last_bus!="" && busdata.frequency_mins!=""){
      
      await axios.get("https://bus-finder-backend.onrender.com/db").then(res=>{
        let dbs = res.data;
        let existed = dbs.find(u=>u.bus_no.toLowerCase() === busdata.bus_no.toLowerCase());
        if(existed){
          alert("Already Bus Existed")
        }else{
          add();
          alert("Added New Bus Route Successfully");
           
           setTimeout(()=>{
              nav("/routes")
           },500)
        }
      })
    }else{
      alert("All fields are Mandatory with Atleast one stop");
    }

    setbusdata({bus_no:"",from:"",to:"",frequency_mins:"",type:"",stops:["","","","","",""],first_bus:"",last_bus:"",})
  }  

  return <>
  
  <div id="main_routes_con">
    <h2 style={{color:"white"}}>ADD BUS ROUTES EXPLICITLY</h2>
    <div id="form_div">
      <input type="text" name="bus_no" placeholder='Enter the Bus no.' className='inputs_add'value={busdata.bus_no} onChange={handle}/>
      <input type="text" name="from" placeholder='Enter the Source(FROM)' className='inputs_add'value={busdata.from} onChange={handle}/>
      <input type="text" name="to" placeholder='Enter the Destination(TO)' className='inputs_add'value={busdata.to} onChange={handle}/>
      <input type="text" name="type" placeholder='Enter the Bus Type' className='inputs_add'value={busdata.type} onChange={handle}/>
      <h3 style={{color:"white"}}>Enter the Stops</h3>
      <div id="stops_div">
        <input type="text" name="stops" className='stops_in' placeholder='Enter the Stop 1' value={busdata.stops[0]} onChange={(e)=>handleStops(0,e.target.value)}/>
        <input type="text" name="stops" className='stops_in' placeholder='Enter the Stop 2' value={busdata.stops[1]} onChange={(e)=>handleStops(1,e.target.value)}/>
        <input type="text" name="stops" className='stops_in' placeholder='Enter the Stop 3' value={busdata.stops[2]} onChange={(e)=>handleStops(2,e.target.value)}/>
        <input type="text" name="stops" className='stops_in' placeholder='Enter the Stop 4' value={busdata.stops[3]} onChange={(e)=>handleStops(3,e.target.value)}/>
        <input type="text" name="stops" className='stops_in' placeholder='Enter the Stop 5' value={busdata.stops[4]} onChange={(e)=>handleStops(4,e.target.value)}/>
        <input type="text" name="stops" className='stops_in' placeholder='Enter the Stop 6' value={busdata.stops[5]} onChange={(e)=>handleStops(5,e.target.value)}/>
      </div>
      <input type="number" name="frequency_mins" placeholder='Enter the Minutes' className='inputs_add' value={busdata.frequency_mins} onChange={handle}/>
      <input type="text" name="first_bus" placeholder='Enter the first bus' className='inputs_add' value={busdata.first_bus} onChange={handle}/>
      <input type="text" name="last_bus" placeholder='Enter the last bus' className='inputs_add' value={busdata.last_bus} onChange={handle}/>
      <button onClick={handleAdd} id='btn_add'>Add Bus</button>
      <button id='home_btn' onClick={handlehome}>Back to Home</button>
      <button id='home_btn' onClick={handleroutes}>Back to Routes</button>
    </div>
  </div>
  
  
  
  </>
}

export default AddRoutes
