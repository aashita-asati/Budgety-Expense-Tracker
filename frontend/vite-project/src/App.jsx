import React from 'react'
import Routings from './Routings';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
   <Routings/>
   <Toaster 
       toastOptions={{
        className: "",
        style: {
          fontSize: '13px'
        },
       }}
       />

   </UserProvider>
  )
}

export default App;
