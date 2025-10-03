// src/store/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: {
    searchResults: [],
  },
};

const dataSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.searchResults = action.payload;
    },
    clearItems: (state) => {
      state.searchResults = [];
    }
  },
});

export const { addItem, clearItems } = dataSlice.actions;
export default dataSlice.reducer;
