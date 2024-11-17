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
    const fetchAllShoes = async()=>{
      try{
        //tries to connect to mysql shoes table
        const res = await axios.get("http://localhost:8888/shoes");
        setShoes (res.data)
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

    //This will print out the data from the database using DOM
    <div>
      <h1>MarketPlace</h1>
      <div className='shoes'>
        {shoes.map((shoe) =>(
          <div className='shoe' key={shoe.id}>
          {shoe.image && <img src={shoe.image} alt={shoe.prod_name}/>}
          <h2> {shoe.prod_name} </h2>
          <p> {shoe.prod_description} </p>
          <span> {shoe.price} </span>
          </div>
        ))}
      </div>
    </div>

      

  )
}

export default Shoes