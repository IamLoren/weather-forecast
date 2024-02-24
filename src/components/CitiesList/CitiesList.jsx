import React from "react";
import {useSelector } from "react-redux";
import { selectedTrips, tripsList} from "../../redux/selectors.js";
import s from "./CitiesList.module.css";
import CityCard from "../CityCard/CityCard.jsx";

const CitiesList = () => {
  const listOfTrips = useSelector(tripsList);
  const searchedTrips = useSelector(selectedTrips);

  
  return (
    <ul className={s.list}>
      {searchedTrips.length>0 && searchedTrips.map(({ city, startDate, endDate, id, img }) => {
        return (
          <CityCard city={city} startDate={startDate} endDate={endDate} id={id} img={img}/>
        );
      })}

      {searchedTrips.length===0 && listOfTrips?.map(({ city, startDate, endDate, id, img }) => {
        return (
          <CityCard city={city} startDate={startDate} endDate={endDate} id={id} img={img}/>
        );
      })}
    </ul>
  );
};

export default CitiesList;
