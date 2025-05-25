import React from 'react';
import { HomeScreen } from './pages/Home';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';


const queryClient = new QueryClient();
 const App =observer(()=> {

  return(
    <QueryClientProvider client={queryClient}>
    <HomeScreen/>
    </QueryClientProvider>
  );
});

export default App;