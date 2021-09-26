import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
  deliveryMethodId?: number;
  clientSecret?: string;
  paymentIntent?: string;
  shippingPrice?: number;
  confirmationUrl?: string;
  orderNumber?: string;
}


export interface IBasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  type: string;
  region: string;
  description: string;
  guId: number;
}

export class Basket implements IBasket {
  id = uuidv4();
  items: IBasketItem[] = [];
}

export interface IBasketTotals {
  shiping: number;
  subtotal: number;
  total: number;
}

