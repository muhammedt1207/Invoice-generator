import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logo: null,
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  from: '',
  to: '',
  items: [
    {
      id: 1,
      description: '',
      quantity: 0,
      rate: 0,
      amount: 0
    }
  ],
  terms: '',
  footNote: 'Thank you for your business',
  subtotal: 0,
  discounts: 0,
  taxRate: 0,
  amountPaid: 0
};

const calculateTotals = (state) => {
  state.subtotal = state.items.reduce((sum, item) => {
    return sum + (item.quantity * item.rate);
  }, 0);
  
  const taxableValue = Math.max(0, state.subtotal - state.discounts);
  state.taxAmount = taxableValue * (state.taxRate / 100);
  state.total = taxableValue + state.taxAmount;
  state.balanceDue = state.total - state.amountPaid;
};

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      calculateTotals(state);
    },
    addItem: (state) => {
      state.items.push({
        id: Math.max(...state.items.map(item => item.id)) + 1,
        description: '',
        quantity: 0,
        rate: 0,
        amount: 0
      });
      calculateTotals(state);
    },
    updateItem: (state, action) => {
      const { id, field, value } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item[field] = value;
        item.amount = item.quantity * item.rate;
      }
      calculateTotals(state);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
    },
    resetForm: () => initialState,
    loadSavedInvoice: (state, action) => {
      return { ...action.payload };
    }
  }
});

export const { updateField, addItem, updateItem, deleteItem, resetForm, loadSavedInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;