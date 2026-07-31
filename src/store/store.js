import { configureStore } from "@reduxjs/toolkit";

import loanReducer from "./loanSlice";
import customerReducer from "./customerSlice";


const store = configureStore({

    reducer: {

        loan: loanReducer,

        customer: customerReducer,

    },

});


export default store;