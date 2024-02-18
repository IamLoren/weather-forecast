import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

import { fetchAllDays, fetchTodayWeather } from "../configAxios/operations.js";

export const tripSlice = createSlice({
  name: "trips",
  initialState: {
    citiesList: ["Paris", "Berlin"],
    citiesImg: {
      paris:
        "https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg",
      berlin:
        "https://cdn.britannica.com/49/179449-138-9F4EC401/Overview-Berlin.jpg?w=800&h=450&c=crop",
    },
    listOfTrips: [{id: 163849, city: "Paris", startDate: '2024-03-01', endDate: '2024-03-06', img: "https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg"}],
    selectedCity: "",
    weatherInSelectedCity: {},
    todayInSelectedCity: {},
    startDateInSelectedCity: '',
    isModalOpen: false
  },
  reducers: {
    changeSelectedCity: (state, { payload }) => {
      state.selectedCity = payload;
      state.startDateInSelectedCity = payload.startDate;
    },
    changeModalOpen: (state, { payload }) => {
        state.isModalOpen = payload;    
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDays.fulfilled, (state, { payload }) => {
        state.weatherInSelectedCity = payload.days;
      })
      .addCase(fetchTodayWeather.fulfilled, (state, { payload }) => {
        state.todayInSelectedCity = payload;
      });
  },
});

export const tripReducer = tripSlice.reducer;
export const {changeSelectedCity,changeModalOpen} = tripSlice.actions;