import React from 'react'
import { useSelector } from 'react-redux'
import { weekWeatherInSelectedCity } from '../../redux/selectors'
import { getDayOfWeek } from '../../utils.js';
import s from './WeekWeather.module.css';
import Icon from '../Icon/Icon.jsx';

const WeekWeather = () => {
    const weatherInPeriod = useSelector(weekWeatherInSelectedCity);
  return (
    <>
    <h2 className={s.title}>Week</h2>
    {Object.keys(weatherInPeriod).length > 0  && <ul className={s.weatherCards}>
       {weatherInPeriod?.map((dayWeather, index) => {
        return <li key={index} className={s.weatherCard}>
            <span>{getDayOfWeek(dayWeather.datetime)}</span>
            <Icon className={"icon"} name={dayWeather.icon} />
            <span>{dayWeather.tempmax}&#176;<span></span>/<span>{dayWeather.tempmin}&#176;</span></span>
        </li>
       })} 
    </ul>}
    </>
  )
}

export default WeekWeather