export interface Product {
  _id?: string,
  reference_id: string,
  name: string,
  gender: string[],
  material: string,
  price: number,
  original_price: number,
  discount: boolean,
  discount_percentage: number,
  type: string[],
  brand: string[],
  image: string,
  shoes: SpecificShoe[]
}

export interface CartItem {
  product: SpecificShoe;
  selectedSize: number;
  quantity: number;
  price: number;
  parentProduct?: Product;
}

export interface SpecificShoe {
  _id?: string,
  shoe_id: string,
  talle_34: number,
  talle_35: number,
  talle_36: number,
  talle_37: number,
  talle_38: number,
  talle_39: number,
  talle_40: number,
  talle_41: number,
  talle_42: number,
  talle_43: number,
  talle_44: number,
  sales: number,
  image: string,
}

export interface User {
  _id: string,
  name: string,
  gender: string,
  lastName: string,
  address: string,
  numberAddress: number,
  phone: string,
  city: string,
  email: string,
  password: string,
  bought: number,
  discount: boolean,
  discount_percentage: number,
  orders: [{
    _id: string,
    user: string,
    reference_id: string,
    orderItems: [{
      product: SpecificShoe,
      quantity: number,
      price: number,
      selectedSize: number  // 👈 nuevo campo
    }],
    paymentMethod: string,
    totalAmount: number,
    isPaid: boolean,
    paidAt: Date,
    status: string,
    transactionId: string
  }]
}

export interface Orders {
  _id: string,
  user: string,
  reference_id: string,
  orderItems: [{
    product: SpecificShoe,
    shoe_id: string,
    quantity: number,
    price: number
  }],
  paymentMethod: string,
  totalAmount: number,
  isPaid: boolean,
  paidAt: Date,
  status: string,
  transactionId: string
}