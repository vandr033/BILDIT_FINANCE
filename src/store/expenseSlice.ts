// src/redux/expensesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
  id: string;
  amount: number;
  category: string;
  notes: string;
  date: string;
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id' | 'date'>>) => {
      const newExpense = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      state.expenses.push(newExpense);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
    resetExpenses: (state) => {
      state.expenses = [];
    },
  },
});

export const { addExpense, deleteExpense, resetExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
