import React from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { listOfCities } from "../../redux/selectors";
import { nanoid } from "nanoid";
import { changeListOfTrips, changeModalOpen } from "../../redux/tripSlice";

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
      const trip = {
        ...values,
        id: nanoid(),
        img,
        startDate: values.startDate.toISOString().split("T")[0],
        endDate: values.endDate.toISOString().split("T")[0],
      };
      dispatch(changeListOfTrips(trip));
      resetForm();
      dispatch(changeModalOpen(false));
    },
  });

  const cancelTrip = () => {
    dispatch(changeModalOpen(false));
  };

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
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
              <div>{formik.errors.city}</div>
            ) : null}
          </div>

          <label htmlFor="startDate">Start Date</label>
          <DatePicker
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
          {formik.touched.startDate && formik.errors.startDate ? (
            <div>{formik.errors.startDate}</div>
          ) : null}

          <label htmlFor="endDate">End date</label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={maxDate}
            id="endDate"
            placeholderText="Select a date"
            selected={formik.values.endDate}
            onChange={(endDate) => formik.setFieldValue("endDate", endDate)}
          />
          {formik.touched.endDate && formik.errors.endDate ? (
            <div>{formik.errors.endDate}</div>
          ) : null}
          <button type="button" onClick={cancelTrip}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
