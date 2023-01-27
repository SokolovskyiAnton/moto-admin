export interface OrderDto {
  id: number,
  transaction_id: string,
  user_id: number,
  user_email: string,
  first_name: string,
  last_name: string,
  address: string,
  country: string,
  phone: string;
  city: string,
  zip: string,
  complete: boolean,
  amount_total: number;
  order_items: OrderItem[]
}

export interface OrderItem {
  id: number;
  product_title: string;
  product_id: number;
  price: number;
  quantity: number;
}

export interface OrderState {
  orders: OrderDto[];
}
