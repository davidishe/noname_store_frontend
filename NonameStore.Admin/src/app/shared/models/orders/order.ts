import { IAddress } from '../user/address';
import { IDeliveryMethod } from './deliveryMethod';
import { PaymentMethod } from './paymentMethod';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: IAddress;
  paymentMethod: PaymentMethod;
}

export interface IOrder {
  id: number;
  byerEmail: string;
  shipToAddress: IAddress;
  deliveryMethod: IDeliveryMethod;
  deliveryPrice: number;
  orderItems: IOrderItem[];
  subtotal: string;
  status: string;
  paymentIntentId: string;
  orderDate: string;
  orderNumber?: string;
}

export interface IOrderItem {
  id: number;
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  guId: number;
}
