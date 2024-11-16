import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';

const Shoes = () =>{
  
  //useState statement accepts or returns the current state (shoes) (example: the cart is at 0 atm. = current state) 
  //the 2nd function (setShoes) will be the one that will update the state
  const [shoes, setShoes] = useState([]);

  //This function updates the whole page of Shoes component, so that the request
  //we send from the backend will be loaded on the front end.

  //useEffect will allow the "const Shoes" to have a life cycle method in one single API. (componentDidMount, componentDidUpdate... etc.)
  useEffect(() => {

    //async function ensures that our function will return a "promise"
    //
    const fetchAllShoes = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/shoes");
        console.log(res);
        //if try condition doesnt run, catch statement will run
      } catch (err) {
          console.log(err);
      } 
    }
    fetchAllShoes();
  },[])
  //The "[]", will only run once.

  //Once the state gets updated  useEffect() will get executed.
  return (
    <div>Shoes</div>
  )
}

export default Shoes