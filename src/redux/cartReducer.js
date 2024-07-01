import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
};

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addItems: (state, action)=>{
            let isProductExists = false;
            state.items.map((item)=>{
                if(item._id===action.payload._id){
                    item.qty += Number(action.payload.qty);
                    isProductExists = true;
                }
                return item;
            });
            if(!isProductExists){
                state.items.push(action.payload);
            }
        },
        updateQty: (state, action)=>{
            state.items.map((item) => {
                if (item._id === action.payload._id) {
                  item.qty = Number(action.payload.qty);
                }
                return item;
              });
            
        },
        deleteItems: (state, action)=>{
            const newItems = state.items.filter(
                (item) => item._id !== action.payload._id
              );
            state.items = newItems;
        },
        resetCart: (state)=>{
            state.items = [];
        }
    }
});

export const {addItems, updateQty, deleteItems, resetCart} = cartReducer.actions;
export default cartReducer.reducer;