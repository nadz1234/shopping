import React from 'react';
import { HomeScreen } from './pages/Home';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { createStaticNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { ShoppingListScreen } from './pages/MyShoppingList';


const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    ShoppingList : ShoppingListScreen
  },
  id: undefined
});
const Navigation = createStaticNavigation(RootStack);

 // we will need  QueryClient as we are using react query 
const queryClient = new QueryClient();

// in mobx we use observer 
 const App =observer(()=> {

  return(

    // because we are using react query we have to wrap our components in QueryClientProvider
    <QueryClientProvider client={queryClient}>
       <Navigation />
    </QueryClientProvider>
  );
});

export default App;