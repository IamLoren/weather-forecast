import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedCity, selectedTrips, tripsList } from "../../redux/selectors.js";
import s from "./CitiesList.module.css";
import {
  fetchAllDays,
  fetchTodayWeather,
} from "../../configAxios/operations.js";
import { changeSelectedCity } from "../../redux/tripSlice.js";

const CitiesList = () => {
  const dispatch = useDispatch();
  const listOfTrips = useSelector(tripsList);
  const selectedCit = useSelector(selectedCity);
  const searchedTrips = useSelector(selectedTrips);

  const allWeather = async (params) => {
    const { city } = params;
    dispatch(changeSelectedCity(params));
    try {
      await Promise.all([
        dispatch(fetchAllDays(params)),
        dispatch(fetchTodayWeather(city)),
      ]);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
  return (
    <ul className={s.list}>
      {searchedTrips.length>0 && searchedTrips.map(({ city, startDate, endDate, id, img }) => {
        return (
          <li
            key={id}
            className={`${s.card} ${id === selectedCit.id ? s.selected : ''}`}
            onClick={() => allWeather({ city, startDate, endDate, id })}
          >
            <img src={img} alt="city" className={s.cardImg} />
            <div className={s.cardDescription}>
              <p>{city}</p>
              <p>
                {startDate.replaceAll("-", ".")} -{" "}
                {endDate.replaceAll("-", ".")}
              </p>
            </div>
          </li>
        );
      })}

      {searchedTrips.length===0 && listOfTrips?.map(({ city, startDate, endDate, id, img }) => {
        return (
          <li
            key={id}
            className={`${s.card} ${id === selectedCit.id ? s.selected : ''}`}
            onClick={() => allWeather({ city, startDate, endDate, id })}
          >
            <img src={img} alt="city" className={s.cardImg} />
            <div className={s.cardDescription}>
              <p>{city}</p>
              <p>
                {startDate.replaceAll("-", ".")} -{" "}
                {endDate.replaceAll("-", ".")}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CitiesList;
