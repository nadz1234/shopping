import { makeAutoObservable } from 'mobx';
import { Product } from "../types/products";

export interface CartItem extends Product{
    quantity:number;
}

class CartStore{
    cart: CartItem[] = [];
    constructor(){
        makeAutoObservable(this);
    }

  addToCart(product:Product)
  {
    const existinProduct = this.cart.find(item => item.id === product.id);
    if(existinProduct)
    {
        existinProduct.quantity += 1;
    }
    else 
    {
        this.cart.push({ ...product, quantity:1});
    }
  }

  removeFromCart(prodId:number)
  {
     this.cart = this.cart.filter(item => item.id === prodId);
  }

  editCart(prodId : number, quantity:number){
    const item = this.cart.find(item => item.id ===prodId);

    if(item && quantity > 0)
    {
        item.quantity = quantity;
    }
  }
    clearCart() {
    this.cart = [];
  }

  get totalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

}

export const cartStore = new CartStore();