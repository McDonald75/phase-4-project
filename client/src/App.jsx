import React, { useEffect } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/landingPage'
import ItemPage from './components/page'
import Cart from './components/cart'
import Orders from './components/orders'
import LogIn from './components/login'
import Register from './components/register'
import AddProduce from './components/addProduce'
import { useGiraf } from './context'

function App() {
  const [count, setCount] = useState(0)
  const {gHead, addGHead} = useGiraf()
 
  return gHead.loggedIn ? (
    <div>
     { gHead.orders && <Orders/>}
     {gHead.cart && <Cart/>}
     {gHead.loading && <div style={{
      position:'absolute',
      bottom:'30px',
      right:'20%'
     }}>loading ...</div>}
   <Routes>
     <Route path='/' element={<Dashboard/>}/>
     <Route path='/update' element={<AddProduce/>}/>
     <Route path='/page' element={<ItemPage/>}/>
   </Routes>
   </div>
  ) :
   (
    <div>
      {/* <Orders/> */}
   <Routes>
     <Route path='/' element={<LogIn/>}/>
     <Route path='/login' element={<LogIn/>}/>
     <Route path='/register' element={<Register/>}/>
   </Routes>
   </div>
  )
}

export default App
