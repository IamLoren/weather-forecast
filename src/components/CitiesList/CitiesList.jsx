import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tripsList } from '../../redux/selectors.js';
import s from './Cities.module.css'
import { fetchAllDays, fetchTodayWeather } from '../../configAxios/operations.js';
import { changeSelectedCity } from '../../redux/tripSlice.js';

const CitiesList = () => {
    const dispatch = useDispatch();
    const listOfTrips = useSelector(tripsList);
    const allWeather = async (params) => {
        const { city } = params;
        dispatch(changeSelectedCity(params))
        try {
            await Promise.all([
                dispatch(fetchAllDays(params)),
                dispatch(fetchTodayWeather(city))
            ]);
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    }
  return (
    <ul>
       {listOfTrips?.map(({city, startDate, endDate, id, img}) => {
       return <li key={id} className={s.card} onClick={()=>allWeather({city, startDate, endDate})}>
        <img src={img} alt="city" className={s.cardImg}/>
        <div>
            <p>{city}</p>
            <p>{startDate.replaceAll('-', '.')} - {endDate.replaceAll('-', '.')}</p>
        </div>
        
        
        </li>
        })} 
    </ul>
  )
}

export default CitiesList