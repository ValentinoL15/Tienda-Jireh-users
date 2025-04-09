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


export interface SpecificShoe {
  _id?: string,
  shoe_id: string,
  size: number,
  stock: number,
  color: string,
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
      price: number
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