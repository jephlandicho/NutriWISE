// src/features/mealPlanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
  result: '',
  otherValue: '',
};

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setOtherValue: (state, action) => {
      state.otherValue = action.payload;
    },
  },
});

export const { setFormData, setResult, setOtherValue } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;
