import { createSlice } from "@reduxjs/toolkit";


const customerSlice = createSlice({

    name:"customer",

    initialState:{
        customers:[]
    },


    reducers:{


        setCustomers:(state,action)=>{

            state.customers = action.payload;

        }


    }


});


export const { setCustomers } = customerSlice.actions;


export default customerSlice.reducer;