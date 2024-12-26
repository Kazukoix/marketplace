import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/ribbon-styled.css";
import { Logo, Profile, Cart } from '../svg-components';


const Ribbon = () =>{

  return (
    //This will print out the data from the database using DOM
    <>
    <div className="offers-bar">OFFERS</div>
    <div className="ribbon-container">
      <div className="ribbon">
        <a href="http://localhost:3000" target="_self" rel="noopener noreferrer">
          <img className="sole-box" src={Logo} alt="sole-box" />
        </a>
        <input className="search-box" type='text' placeholder='Search'></input>
        <div className="icons">
          <img className="sole-box" src={Profile} alt="sole-box"/>
          <p>Sign in</p>
          <img className="sole-box" src={Cart} alt="sole-box" />
        </div>
      </div>
    </div>
    </>


      

  )
}

export default Ribbon