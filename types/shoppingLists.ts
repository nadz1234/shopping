//this type holds your data types and fields for your shopping list with the necassary fields
export type ShoppingItem = {
  id: number;
  category: string;
  purchased: boolean;
  title: string;
  price: number;
  description: string;
  quantity:number;

};
