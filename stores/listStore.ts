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
   searchQuery = "";

setSearchQuery(query: string) {
  this.searchQuery = query;
}

get filteredList() {
  return this.listItems.filter(item =>
    item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

    

    // this is the load function it chectks to see if we have a json obj saved on local storage 
   
async load() {
  try {
    const json = await AsyncStorage.getItem('shoppingList');
    
    if (json) {
      const parsed = JSON.parse(json);
      
      if (Array.isArray(parsed)) {
        runInAction(() => {
          this.listItems = parsed;
        });
      } else {
        console.warn('invalid data');
      }
    }
  } catch (error) {
    console.error('Failed to load list:', error);
  }
}

  // this saves your json item , and you call on save on your CRUD actions as you will see below 
 async save() {
  try {
    const json = JSON.stringify(this.listItems);
    await AsyncStorage.setItem('shoppingList', json);
  } catch (error) {
    console.error('Failed to save list:', error);
  }
}


  // this adds to your  listItems 
addToList(product: Product) {
  try {
    const existingProduct = this.listItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.listItems.push({
        ...product,
        quantity: 1,
        purchased: false,
      });
    }

    this.save();
  } catch (error) {
    console.error('Failed to add product to the list:', error);
  }
}


  //this will remove an item from the list based on the id selected
removeFromList(prodId: number) {
  try {
    this.listItems = this.listItems.filter(item => item.id !== prodId);
    this.save();
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
}


  // you can edit the quantity value in your list
editList(prodId: number, quantity: number) {
  try {
    const item = this.listItems.find(item => item.id === prodId);

    if (item && quantity > 0) {
      item.quantity = quantity;
      this.save();
    } else if (!item) {
      console.warn('Item not found in the list.');
    } else {
      console.warn('Invalid quantity. Must be greater than 0.');
    }
  } catch (error) {
    console.error('Error updating item quantity:', error);
  }
}
    editListPurchased(prodId: number) {
  try {
    const item = this.listItems.find(item => item.id === prodId);

    if (item) {
      item.purchased = true;
      this.save();
    } else {
      console.warn('Item not found for marking as not purchased.');
    }
  } catch (error) {
    console.error('Error updating purchased status:', error);
  }
}
    clearList() {
    this.listItems = [];
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