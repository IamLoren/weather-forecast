import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchAllDays, fetchTodayWeather } from "../configAxios/operations.js";

export const tripSlice = createSlice({
  name: "trips",
  initialState: {
    citiesList: [
      {name: "Paris",
       img: "https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg"},
      {name: "Berlin",
        img: "https://cdn.britannica.com/49/179449-138-9F4EC401/Overview-Berlin.jpg?w=800&h=450&c=crop"},
        {name: "Rome", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJ9zvckppp70hlKUbDrhXQvrWIBflwE8DNTyUIzB2Cg&s"},
        {name: "London", img: "https://media.istockphoto.com/id/1294454411/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BB%D0%BE%D0%BD%D0%B4%D0%BE%D0%BD-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8B-%D1%81-big-ben-double-decker-buses-%D0%B8-red-phone-booth-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B8-%D0%B2%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=OysSBoMyFKhNuKuRDtLCLGOznb8MJwoy9WR8Xh70wgc="},
        {name: "Barcelona", img: "https://kiyavia.com/files/cities/barselona/Barcelona_1920.jpg"},
        {name: "Lisbon", img: "https://media.istockphoto.com/id/1221460597/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B6%D0%B5%D0%BB%D1%82%D1%8B%D0%B9-%D0%B2%D0%B8%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D1%8B%D0%B9-%D1%82%D1%80%D0%B0%D0%BC%D0%B2%D0%B0%D0%B9-%D0%BD%D0%B0-%D1%83%D0%BB%D0%B8%D1%86%D0%B5-%D0%B2-%D0%BB%D0%B8%D1%81%D1%81%D0%B0%D0%B1%D0%BE%D0%BD%D0%B5-%D0%BF%D0%BE%D1%80%D1%82%D1%83%D0%B3%D0%B0%D0%BB%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=dwv5t3OWmrWN8pMakj2PkAX8EuLnf6Uw3RlzBgLP8XA="},
       {name: "Madeira", img: "https://www.shutterstock.com/image-photo/aerial-view-land-meets-ocean-260nw-2280373671.jpg"},
        {name: "Santorini", img: "https://media.istockphoto.com/id/166471469/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D0%B8%D1%8F-%D0%BD%D0%B0-%D1%81%D0%B0%D0%BD%D1%82%D0%BE%D1%80%D0%B8%D0%BD%D0%B8.jpg?s=612x612&w=0&k=20&c=Qmc2u8F6aDp8IqZcFJHZtgkrBBnclS9u6vsRtEb9djY="},
        {name: "Athens", img: "https://media.cntraveler.com/photos/5ad0ca78fb3e8334dea6e22e/16:9/w_2560%2Cc_limit/GettyImages-88786323.jpg"},
        {name: "Syracuse", img: "https://media.istockphoto.com/id/1496587268/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B8%D1%80%D0%B0%D0%BA%D1%83%D0%B7%D1%8B-%D1%81%D0%B8%D1%86%D0%B8%D0%BB%D0%B8%D1%8F-%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=bulTTs2GludZ5mDVTIYRqo9FBZurWHwXgPd9GIM62B0="}
    ],
    listOfTrips: [{id: 163849, city: "Paris", startDate: '2024-03-01', endDate: '2024-03-06', img: "https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg"}],
    selectedCity: "",
    weatherInSelectedCity: {},
    todayInSelectedCity: {},
    startDateInSelectedCity: '',
    searchWord: '',
    searchedTrips: [],
    isModalOpen: false
  },
  reducers: {
    changeListOfTrips: (state, { payload }) => {
        state.listOfTrips.push(payload);
        const notify = () => toast.success("You have succefully added another trip to your list!");
        notify();
      },
    changeSelectedCity: (state, { payload }) => {
      state.selectedCity = payload;
      state.startDateInSelectedCity = payload.startDate;
    },
    changeSearchWord: (state, { payload }) => {
      state.searchWord = payload;    
    },
    changeSearchedTrips: (state, { payload }) => {
      state.searchedTrips = [...payload];    
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
export const {changeSelectedCity,changeModalOpen, changeSearchedTrips, changeSearchWord, changeListOfTrips} = tripSlice.actions;