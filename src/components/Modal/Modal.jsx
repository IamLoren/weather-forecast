import React from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";

const Modal = () => {
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            {formik.touched.city && formik.errors.city ? (
          <div>{formik.errors.city}</div>
        ) : null}
          </div>

          <label htmlFor="startDate">Start Date</label>
          <DatePicker
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
            id="endDate"
            placeholderText="Select a date"
            selected={formik.values.endDate}
            onChange={(endDate) => formik.setFieldValue("endDate", endDate)}
          />
           {formik.touched.endDate && formik.errors.endDate ? (
          <div>{formik.errors.endDate}</div>
        ) : null}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
