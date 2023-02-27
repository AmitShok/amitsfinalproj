import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';
import Products from "../../models/manyProducts"
import Product from '../../models/Product';
import { getAllProducts, getNextProds } from './manyProductsAPI';

//  THIS STATE HOLDS ALL PRODUCTS AND THEIR CATEGORIES 

const initialState: Products = {
  products: [],
  categories: []
};

export const getAllProductsAsync = createAsyncThunk(
  'products/getAllProducts',
  async (allProducts: boolean = false) => {
    const response = await getAllProducts(allProducts);
    return response.data;
  }
);


export const getMoreProdsAsync = createAsyncThunk(
  'products/getmoreproducts',
  async (creds: string) => {
    const response = await getNextProds(creds);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // todo
    // getProductByCategory: (state, action) => {    },



  },

  extraReducers: (builder) => {
    builder

      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload
        state.products.results.forEach((e: Product) => { !state.categories.includes(e.category) && state.categories.push(e.category) }
        )
      })
      .addCase(getMoreProdsAsync.fulfilled, (state, action) => {
        state.products = action.payload
      })
  },
});

export const { } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.productz.products;
export const selectCategories = (state: RootState) => state.productz.categories;

export default productsSlice.reducer;
