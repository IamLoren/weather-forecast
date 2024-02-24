import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedCity, selectedTrips, tripsList, weekWeatherInSelectedCity } from "../../redux/selectors.js";
import s from "./CitiesList.module.css";
import {
  fetchAllDays,
  fetchTodayWeather,
} from "../../configAxios/operations.js";
import { changeSelectedCity, clearWeatherInSelectedCity, deleteCityFromListOfTrips } from "../../redux/tripSlice.js";

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

  const deleteCity = (id) => {
    dispatch(deleteCityFromListOfTrips(id));
    if (id === selectedCit.id) {
      dispatch(changeSelectedCity(''));
      dispatch(clearWeatherInSelectedCity())
    }
  }
  return (
    <ul className={s.list}>
      {searchedTrips.length>0 && searchedTrips.map(({ city, startDate, endDate, id, img }) => {
        return (
          <li
            key={id}
            className={`${s.card} ${id === selectedCit.id ? s.selected : ''}`}
            onClick={(event) => {
              if (event.target.tagName !== "BUTTON") {
                allWeather({ city, startDate, endDate, id });
              }
            }}
          >
            <img src={img} alt="city" className={s.cardImg} />
            <div className={s.cardDescription}>
              <p className={s.cityAnDeleteWrapper}><span>{city}</span><button className={s.deleteButton} type="button" onClick={()=>deleteCity(id)}> - </button></p>
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
            onClick={(event) => {
              if (event.target.tagName !== "BUTTON") {
                allWeather({ city, startDate, endDate, id });
              }
            }}
          >
            <img src={img} alt="city" className={s.cardImg} />
            <div className={s.cardDescription}>
            <p className={s.cityAnDeleteWrapper}><span>{city}</span><button className={s.deleteButton} type="button"  onClick={()=>deleteCity(id)}> - </button></p>
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
