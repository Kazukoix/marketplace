import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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


  const handleDelete = async(id)=>{
    try{
      await axios.delete("http://localhost:8888/shoes/" +id);
      window.location.reload();
    } catch (err) {
        console.log(err);
    } 
  };

  //Once the state gets updated  useEffect() will get executed.
  return (

    //This will print out the data from the database using DOM
    <div>
      <h1>MarketPlace</h1>
      <div className='shoes'>
        {shoes.map((shoe) =>(
          <div className='shoe' key={shoe.id}>
          {shoe.image &&   <img className="product-shoe-image" src={`http://localhost:8888/images/${shoe.image}`}alt={shoe.prod_name}/>}
            <h2> {shoe.prod_name} </h2>
            <p> {shoe.prod_description} </p>
            <span> {shoe.price} </span>
            <button className="delete" onClick={()=> handleDelete(shoe.id)}>Delete</button>
            <button className="update"><Link to={`/update/${shoe.id}`}>Update</Link></button>

          </div>
        ))}
      </div>

      <button>
        <Link to= "/add">Add new item</Link>
      </button>
    </div>

      

  )
}

export default Shoes