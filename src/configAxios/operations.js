import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../configAxios/configAxios';

export const fetchAllDays = createAsyncThunk(
  'fetchAll',
  async ({city, startDate, endDate}, thunkApi) => {
    try {
      const { data } = await api.get(`/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=BA5AQN7G37ZKBFQ6CSNW7GAAB&contentType=json`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchTodayWeather = createAsyncThunk(
  'fetchToday',
  async (city, thunkApi) => {
    try {
      const { data } = await api.get(`/${city}/today?unitGroup=metric&include=days&key=BA5AQN7G37ZKBFQ6CSNW7GAAB&contentType=json`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

