import React from "react";
import { createPortal } from "react-dom";
import WeekWeather from "../WeekWeather/WeekWeather";
import TodayWeather from "../TodayWeather/TodayWeather";
import CitiesList from "../CitiesList/CitiesList";
import SearchBar from "../SearchBar/SearchBar";
import AddTripButton from "../AddTripButton/AddTripButton";
import s from "./Lajout.module.css";
import { useSelector } from "react-redux";
import { modalOpen } from "../../redux/selectors";
import Modal from "../Modal/Modal";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    const isModalOpen = useSelector(modalOpen);
  return (
    <div className={s.flexWrapper}>
      <div className={s.leftSideWrapper}>
        <h1 className={s.title}>Weather <span className={s.accentSpan}>Forecast</span></h1>
        <SearchBar />
        <CitiesList />
        <WeekWeather />
      </div>
      <AddTripButton />
      <TodayWeather />
      <ToastContainer />
      {isModalOpen && createPortal(
        <Modal />,
        document.body
      )}
    </div>
  );
};

export default Layout;
