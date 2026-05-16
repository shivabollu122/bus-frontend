import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Routesfind = () => {
  
  let [data,setdata] = useState([]);

  let fetchapi=()=>{
    axios.get("https://bus-finder-backend.onrender.com/db").then(res=>setdata(res.data)).catch(err=>console.log(err));
  }

  useEffect(()=>{
    fetchapi();
  },[])  


  let nav = useNavigate();

  let handle=()=>{
    setTimeout(()=>{
      nav("/")
    },700)
  }

  let handle1=()=>{
    setTimeout(()=>{
      nav("/add");
    },700)
  }
  
  return <>
  
  <div id="main_route_con">
    <h2 style={{fontSize:"2vw",color:"white"}}>TGSRTC HYDERABAD CITY BUS ROUTES</h2>
    <table border="1" style={{fontSize:"2vw",textAlign:"center",borderCollapse:"collapse",color:"white",border:"2px solid white"}}>
      <thead>
        <tr>
          <th>BUS NO.</th>
          <th>FROM</th>
          <th>TO</th>
          <th>TYPE</th>
          <th>FREQUENCY-MINS</th>
          <th>FIRST-BUS</th>
          <th>LAST-BUS</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(res=>{
            return <tr key={res._id}>
              <td>{res.bus_no}</td>
              <td>{res.from}</td>
              <td>{res.to}</td>
              <td>{res.type}</td>
              <td>{res.frequency_mins}mins</td>
              <td>{res.first_bus}AM</td>
              <td>{res.last_bus}PM</td>
            </tr>
          })
        }
      </tbody>
    </table>
    <h3 style={{color:"white",fontWeight:"100"}}>NOTE : It Just An Sample Data Collected From Various Sources,It is not an entire Full Filled Routes Data.</h3>
    <span style={{color:"white"}}>NOTE: THIS IS A LANDSCAPE SITE.</span>
    <button id='btn_r' onClick={handle}>BACK TO HOME PAGE</button>
    <button id='btn_r' onClick={handle1}>Add More Routes</button>
  </div>
  
  
  </>
}

export default Routesfind