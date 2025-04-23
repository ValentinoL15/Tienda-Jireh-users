import { SpecificShoe } from "@app/interfaces/interfaces"

export interface UserModel {
  _id: string,
  name: string,
  gender: string,
  lastName: string,
  address: string,
  numberAddress: number,
  phone: string,
  city: string,
  email: string,
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