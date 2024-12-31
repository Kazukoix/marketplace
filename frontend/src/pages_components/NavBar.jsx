import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/navBar.styled.css";

import { Logo, Profile, Cart } from '../svg-components';

const NavBar = () =>{

  return (
    //This will print out the data from the database using DOM
    <div className="nav-bar">
      <ul className="nav-list">
        <li><a href="http://localhost:3000/mens" target="_self" rel="noopener noreferrer">MEN</a></li>
        <li><a href="http://localhost:3000" target="_self" rel="noopener noreferrer">WOMEN</a></li>
        <li><a href="http://localhost:3000" target="_self" rel="noopener noreferrer">KIDS</a></li>
        <li><a href="http://localhost:3000" target="_self" rel="noopener noreferrer">SALES</a></li>
        <li><a href="http://localhost:3000" target="_self" rel="noopener noreferrer">RELEASE</a></li>
        <li><a href="http://localhost:3000" target="_self" rel="noopener noreferrer">BRANDS</a></li>
      </ul>
    </div>
    

      

  )
}

export default NavBar;