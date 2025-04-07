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

export interface Orders {
  user: string,
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
}