import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import MyOrders, { Order } from "../../models/myOrders"
import Product from '../../models/Product';
import { getOrders } from './myOrderAPI';

//  THIS STATE HOLDS ALL THE ORDERS THE USER MADE

const initialState: MyOrders = {
  orders: [],
  productsOrderd: []
};

export const userOrdersAsync = createAsyncThunk(
  'myorder/usersOrders',
  async () => {
    const response = await getOrders();
    return response.data;
  }
);

export const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    // todo
    // getProductByCategory: (state, action) => {    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userOrdersAsync.fulfilled, (state, action) => {
        state.orders = [...action.payload]
        state.orders.forEach((order: any) => {
          order.orderItems.forEach((product: any) => {
            // add to productsOrderd all the product id's that user orderd - so we can give 
            // permission to user to make a review on a item he orderd
              { !state.productsOrderd.includes(product.product) && state.productsOrderd.push(product.product) }
          });
        });
      })
  },
});

export const { } = myOrdersSlice.actions;
// export const selectProducts = (state: RootState) => state.productz.products;
export const selectOrders = (state: RootState) => state.myOrders.orders;
export const selectProdctsOrderd = (state: RootState) => state.myOrders.productsOrderd;

export default myOrdersSlice.reducer;
