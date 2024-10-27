import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './reducers/InvoiceSlice';


export const store = configureStore({
    reducer: {
      invoice: invoiceReducer
    }
  });