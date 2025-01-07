import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowCase from '../pages_components/Front.ad';
import ShowCaseII from '../pages_components/Front.adTwo';
import ShowCaseIII from '../pages_components/Front.adThree';
import TopPicks from '../pages_components/TopPicksComp';
import MenPicks from '../pages_components/MenPicks';
const Shoes = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const res = await axios.get("http://localhost:8888/shoes");
        setShoes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllShoes();
  }, []);


  return (
    <div>
      <ShowCase/>
      <TopPicks/>
      <ShowCaseII/>
      <MenPicks/>
    </div>
  );
};

export default Shoes;
