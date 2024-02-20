import React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { listOfCities } from "../../redux/selectors";
import { nanoid } from "nanoid";
import { changeListOfTrips, changeModalOpen } from "../../redux/tripSlice";
import s from './Modal.module.css'
import Icon from "../Icon/Icon";

const Modal = () => {
  const dispatch = useDispatch();
  const citiesList = useSelector(listOfCities);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  const validationSchema = Yup.object().shape({
    city: Yup.string().required("City is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { img } = citiesList.find((city) => city.name === values.city);
      
      const startDay = new Date(values.startDate);
      startDay.setHours(23, 59, 59, 999);
   
      const endDay = new Date(values.endDate);
      endDay.setHours(23, 59, 59, 999);
      
      const trip = {
        ...values,
        id: nanoid(),
        img,
        startDate: startDay.toISOString().split("T")[0],
        endDate: endDay.toISOString().split("T")[0],
      };
      dispatch(changeListOfTrips(trip));
      resetForm();
      dispatch(changeModalOpen(false));
    },
  });

  const cancelTrip = () => {
    dispatch(changeModalOpen(false));
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "auto";
        dispatch(changeModalOpen(false));
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dispatch]);

  return (
    <div className={s.backdrop} onClick={(e) =>
        !e.target.closest("article") && cancelTrip()}>
      <article className={s.modal}>
        <h2 className={s.title}>Create trip</h2>
        <div className={s.closeButtonWrapper}>
            <Icon name={"icon-close"} className={s.closeButton} onClick={cancelTrip}/>
        </div>
        
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <div className={s.wrapper}>
            <label htmlFor="city" className={s.label}><Icon name="icon-asterisk" className={s.asterisk}/> City</label>
            <select
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={s.select}
            >
              <option value="" disabled hidden>
                Please select a city
              </option>
              {citiesList?.map((city, index) => {
                return (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                );
              })}
            </select>
            {formik.touched.city && formik.errors.city ? (
              <div className={s.errorMessage}>{formik.errors.city}</div>
            ) : null}
          </div>
                <div className={s.wrapper}>
                    <label htmlFor="startDate" className={s.label}><Icon name="icon-asterisk" className={s.asterisk}/> Start Date</label>
          <DatePicker
          className = {s.input}
          wrapperClassName = {s.datepickerWrapper}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={maxDate}
            id="startDate"
            placeholderText="Select a date"
            selected={formik.values.startDate}
            onChange={(startDate) =>
              formik.setFieldValue("startDate", startDate)
            }
          />
          <Icon name={"icon-calendar"} className={s.calendarIcon}/>
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className={s.errorMessage}>{formik.errors.startDate}</div>
          ) : null} <br />
                </div>
          
            <div className={s.wrapper}>
               <label htmlFor="endDate" className={s.label}><Icon name="icon-asterisk" className={s.asterisk}/> End date</label>
          <DatePicker
           className = {s.input}
           wrapperClassName = {s.datepickerWrapper}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={maxDate}
            id="endDate"
            placeholderText="Select a date"
            selected={formik.values.endDate}
            onChange={(endDate) => formik.setFieldValue("endDate", endDate)}
          />
           <Icon name={"icon-calendar"} className={s.calendarIcon}/>
          {formik.touched.endDate && formik.errors.endDate ? (
            <div className={s.errorMessage}>{formik.errors.endDate}</div>
          ) : null}  
            </div>
          

          <div className={s.buttonsWrapper}>
            <button type="button" onClick={cancelTrip} className={s.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={s.submitButton}>Save</button>
          </div>  
        </form>
      </article>
    </div>
  );
};

export default Modal;
