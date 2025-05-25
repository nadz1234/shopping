import { makeAutoObservable, runInAction } from 'mobx';
import { Product } from "../types/products";
import { ShoppingItem } from '../types/shoppingLists';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListStore{
  // here we are using the ShoppingItem type 
    listItems: ShoppingItem[] = [];
    constructor(){
        makeAutoObservable(this);

        // will load from async storage 
        this.load();
    }
    

    // this is the load function it chectks to see if we have a json obj saved on local storage 
    async load() {
    const json = await AsyncStorage.getItem('shoppingList');
    if (json) {
      runInAction(() => {
        this.listItems = JSON.parse(json);
      });
    }
  }

  // this saves your json item , and you call on save on your CRUD actions as you will see below 
    async save() {
    await AsyncStorage.setItem('shoppingList', JSON.stringify(this.listItems));
  }


  // this adds to your  listItems 
  addToList(product:Product)
  {

    // it checks if theres an existing product against the original list items thats present
    const existinProduct = this.listItems.find(item => item.id === product.id);
    if(existinProduct)
    {
      //if exists, just update the quantity 
        existinProduct.quantity += 1;
        //then save
        this.save();
    }
    else 
    {
      // else it will create a new entry for the item
        this.listItems.push({
          ...product, quantity: 1,
          purchased: false
        });
        this.save();
    }
  }


  //this will remove an item from the list based on the id selected
  removeFromList(prodId:number)
  {
     this.listItems = this.listItems.filter(item => item.id === prodId);
     this.save();
  }


  // you can edit the quantity value in your list
  editList(prodId : number, quantity:number){
    const item = this.listItems.find(item => item.id ===prodId);

    if(item && quantity > 0)
    {
        item.quantity = quantity;
        this.save();
    }
  }
    clearList() {
    this.listItems = [];
  }

  // this is to toggle between your purchase of the item , it will then set the bool value to true or false depending on your selection
  togglePurchased(prodId: number) {
    const item = this.listItems.find(item => item.id === prodId);
    if (item) {
      item.purchased = !item.purchased;
      this.save();
    }
  }

  // this will return the number of items in the list which we will use on the ui 
get itemCount()
{
 return this.listItems.length;
}

  get totalItems() {
    return this.listItems.reduce((sum, item) => sum + item.quantity, 0);
  }


  // sums up  the total price of items in the list  
  get totalPrice() {
    return this.listItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

}

export const listStore = new ListStore();