import { createSelector } from "@ngrx/store";
import { UserModel } from "./counter.model";

const state = ((state: UserModel) => state)

export const getUser = createSelector(state, (state: UserModel) => ({
  _id: state._id,
  name: state.name,
  lastName: state.lastName,
  address: state.address,
  numberAddress: state.numberAddress,
  phone: state.phone,
  city: state.city,
  email: state.email,
  bought: state.bought,
  discount: state.discount,
  discount_percentage: state.discount_percentage,
  orders: state.orders
}))