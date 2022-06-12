import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentCast } from '../services/weather';
import { ILocation } from '../types';

export type WeatherCastState = {
  list: any[];
  loading: boolean;
};

const initialState: WeatherCastState = {
  list: [],
  loading: false
};

export const fetchCurrentCastByLocation = createAsyncThunk('events/fetchCurrentCastByLocation', async (location: ILocation) => {
  const response = await fetchCurrentCast(location);
  return response.data;
});

const weatherCastSlice = createSlice({
  name: 'weatherCast',
  initialState,
  reducers: {
    setCasts(state: WeatherCastState, action: { payload: any[]; }) {
      state.list = action.payload;
    },
    initCasts(_: WeatherCastState, action: PayloadAction<Partial<WeatherCastState>>) {
      return { ...initialState, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCastByLocation.pending, (state: WeatherCastState) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentCastByLocation.fulfilled, (state: WeatherCastState, action: { payload: { data: any[]; }; }) => {
      const list: any[] = action.payload.data;
      state.list = list;
      state.loading = false;
    });
    builder.addCase(fetchCurrentCastByLocation.rejected, (state: WeatherCastState) => {
      state.loading = false;
    });
  }
});

export const {
  setCasts,
  initCasts,
} = weatherCastSlice.actions;

export const weatherCastReducer = weatherCastSlice.reducer;
