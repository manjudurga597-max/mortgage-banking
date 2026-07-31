import { createSlice } from "@reduxjs/toolkit";

const loanSlice = createSlice({
    name: "loan",

    initialState: {
        loans: []
    },

    reducers: {
        setLoans: (state, action) => {
            state.loans = action.payload;
        }
    }
});

export const { setLoans } = loanSlice.actions;

export default loanSlice.reducer;