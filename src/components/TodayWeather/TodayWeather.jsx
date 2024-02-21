import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedCity, startDateInSelectedCity, today } from "../../redux/selectors";
import { countdownTimer, fahrenheitToCelsius, getDayOfWeek } from "../../utils";
import s from "./TodayWeather.module.css";
import cat from '../../img/cat.png'
import Icon from "../Icon/Icon";

const TodayWeather = () => {
  const city = useSelector(selectedCity);
  const startDate = useSelector(startDateInSelectedCity);
  const todayInCity = useSelector(today);
  const date =
    todayInCity.days && todayInCity.days.length > 0
      ? todayInCity.days[0].datetime
      : null;
  const temperature =
    todayInCity.days && todayInCity.days.length > 0
      ? todayInCity.days[0].temp
      : null;
  const [counter, setCounter] = useState(startDate ? countdownTimer(startDate) : null);

  useEffect(() => {
    const timer = setInterval(() => {
        if (startDate) {
            setCounter(countdownTimer(startDate));
        }  
    }, 1000);

    return () => clearTimeout(timer);
  },[city, counter, startDate] );

  return (
    <>
      {city &&  (
        <article className={s.article}>
          <img src={cat} alt="icon" className={s.userPhoto}/>
          <p className={s.weekDay}>{date && getDayOfWeek(date)}</p>
          <p className={s.temperature}>
          <Icon name={todayInCity?.days?.[0]?.icon}/> 
          <span>{temperature && fahrenheitToCelsius(temperature).toFixed()}&#8451;</span>
          </p>
          <p className={s.city}>{city.city}</p>
          {typeof counter === "object" && (
            <div className={s.timer}>
              <div className={s.timeWrapper}>
                <span className={s.counterNumber}>{counter?.days}</span> <span>DAYS</span>
              </div>
              <div className={s.timeWrapper}>
                <span className={s.counterNumber}>{counter?.hours}</span> <span>HOURS</span>
              </div>
              <div className={s.timeWrapper}>
                <span className={s.counterNumber}>{counter?.minutes}</span> <span>MINUTES</span>
              </div>
              <div className={s.timeWrapper}>
                <span className={s.counterNumber}>{counter?.seconds}</span> <span>SECONDS</span>
              </div>
            </div>
          )}
          {typeof counter != "object" && <div>{counter}</div>}
        </article>
      )}
      {!city && <article className={s.helloArticle}><h2 className={s.helloTitle}>Click on the trip card to see the weather in this city today</h2> </article>}
    </>
  );
};

export default TodayWeather;
