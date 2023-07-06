
import { configureStore } from '@reduxjs/toolkit';
import mealPlanReducer from '../Features/mealPlanSlice';

const store = configureStore({
  reducer: {
    mealPlan: mealPlanReducer,
  },
});

export default store;
