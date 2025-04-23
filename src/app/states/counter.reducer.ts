import { createReducer, on } from "@ngrx/store";
import { UserModel } from "./counter.model";
import { login, logout } from "./counter.actions";

const initalUser: UserModel = {
_id: "",
  name: "",
  gender: "",
  lastName: "",
  address: "",
  numberAddress: 0,
  phone: "",
  city: "",
  email: "",
  bought: 0,
  discount: false,
  discount_percentage: 0,
  orders: [{
    _id: "",
    user: "",
    reference_id: "",
    orderItems: [{
      product: {
        _id: "",
        shoe_id: "",
        talle_34: 0,
        talle_35: 0,
        talle_36: 0,
        talle_37: 0,
        talle_38: 0,
        talle_39: 0,
        talle_40: 0,
        talle_41: 0,
        talle_42: 0,
        talle_43: 0,
        talle_44: 0,
        sales: 0,
        image: "",
      },
      quantity: 0,
      price: 0,
      selectedSize: 0  // 👈 nuevo campo
    }],
    paymentMethod: "",
    totalAmount: 0,
    isPaid: false,
    paidAt: new Date(),
    status: "",
    transactionId: ""
  }]
}

export const counterReducer = createReducer(initalUser, 
  on(login, (state,{user}) => ({ ...state, ...user })),
  on(logout, (state) => ({ ...state, ...initalUser }))
)