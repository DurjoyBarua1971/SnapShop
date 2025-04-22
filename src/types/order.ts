export interface Customer {
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  id: number;
  customer: Customer;
  date: string;
  items: number;
  price: number;
  status: string;
}