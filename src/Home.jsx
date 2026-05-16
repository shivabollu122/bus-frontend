import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaBus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {

  let [data,setdata] = useState([]);

  let [userdata,setuserdata] = useState({source:"",destination:""});

  let [particular,setparticular] = useState([]);

  let [sample,setsample] = useState(false);

  let [again,setagain] = useState(false);


  let fetchapi=async()=>{
    if(userdata.source!="" && userdata.destination!=""){
      axios.get("https://bus-finder-backend.onrender.com/db").then(res=>{
      let buses = res.data;
      let existed = buses.find(u=>u.from.toLowerCase() === userdata.source.toLowerCase() && u.to.toLowerCase() === userdata.destination.toLowerCase());
      if(existed){
        setparticular(existed);
        setsample(true);
        setagain(false);
      }else{
        setagain(true);
        setsample(false);
      }
    }).catch(err=>console.log(err));
    }else{
      alert("All input Fields are Mandatory");
    }

    setuserdata({source:"",destination:""})
  }

  let handleinput=(e)=>{
    setuserdata({...userdata,[e.target.name]:e.target.value});
  }

  

  return <>
  <div id="main_con">
      <div id="buses_con">
        <nav id="nav">
          <div id="first">
            <FaBus className='bus_icon'/>
            <h1><span id='sample'>Bus</span><span id='finder_heading'>Finder</span></h1>
          </div>
          <div id="second">
            <Link to="/" className='links'><h2>Home</h2></Link>
            <Link className='links' to="/routes"><h2>Routes</h2></Link>
            <Link className='links' to="/add"><h2>Add Routes</h2></Link>
          </div>
        </nav>
        <div id="down_div">
            <div id="left_div" className='inside_divs'>
                <div id="normal_headings">
                    <h1>Find Your bus TGSRTC</h1>
                    <h1 id='again_h1'>From Source to Destination</h1>
                    <span>Search for buses, Hyderabad City buses.</span>
                    <span>Search your journey hassle-free.</span>
                </div>
                <div id="inputs_con">
                    <h3>From</h3>
                    <input type="text" name="source" id="" placeholder='Enter the Source'className='inputs'onChange={handleinput} value={userdata.source}/>
                    <h3>To</h3>
                    <input type="text" name="destination" id="" placeholder='Enter the destination'className='inputs'onChange={handleinput} value={userdata.destination}/>
                    <button id='btn' onClick={fetchapi}>Search Buses</button>
                </div>
            </div>
            <div id="right_div" className='inside_divs'>
              {
                sample ? <div id="details_con">
                  <h2>Buses From <span className='details'>{particular.from}</span> to <span className='details'>{particular.to}</span></h2>
                  <h2>Bus no : <span className='details'>{particular.bus_no}</span></h2>
                  <h2>Bus Type : <span className='details'>{particular.type}</span></h2>
                  <div id="stops_div">
                    <h2>Stops:</h2>
                    <div id="each_stop">
                      {
                        particular.stops.map(res=><span className='details'key={res}>{res}</span>)
                      }
                    </div>
                  </div>
                  <h2>Every : <span className='details'>{particular.frequency_mins}mins</span></h2>
                  <h2>First Bus : <q><span className='details'>{particular.first_bus}AM</span></q></h2>
                  <h2>Last Bus : <q><span className='details'>{particular.last_bus}PM</span></q></h2>
                </div> : null
              }
              {
                again ? <div id="error"><h1>🚌No <span className='details'>BUSES</span> Found !</h1></div> : null
              }
            </div>
        </div>
      </div>
    </div>
  </>
}

export default Home