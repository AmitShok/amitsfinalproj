import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/adminTools/productSlice';
import cartReducer, { orderAsync } from '../features/cart/cartSlice';
import loginReducer from '../features/login/loginSlice';
import productsReducer from '../features/Home/manyProductsSlice';
import myOrdersReducer from '../features/MyOrders/myOrdersSlice';
import reviewReducer from '../features/review/reviewSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
    cart: cartReducer,
    productz: productsReducer,
    myOrders: myOrdersReducer,
    review:reviewReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
