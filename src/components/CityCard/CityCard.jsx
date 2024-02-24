import React from 'react';
import s from './CityCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCity } from '../../redux/selectors';
import { changeSelectedCity, clearWeatherInSelectedCity, deleteCityFromListOfTrips } from '../../redux/tripSlice';
import { fetchAllDays, fetchTodayWeather } from '../../configAxios/operations';

const CityCard = ({city, startDate, endDate, id, img}) => {
    const dispatch = useDispatch();
    const selectedCit = useSelector(selectedCity);

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
  )
}

export default CityCard