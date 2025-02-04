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
import AlertBox from './components/alert'
import Cookies from 'js-cookie'

function App() {
  const [count, setCount] = useState(0)
  const {gHead, addGHead} = useGiraf()
  useEffect(()=>{
    let user = Cookies.get('user')
    if(user){
      let userd = JSON.parse(user)
      addGHead('user', userd)
      addGHead("loggedIn", true)
    }
  },[])
 
  return gHead.loggedIn ? (
    <div>
     { gHead.orders && <Orders/>}
     {gHead.cart && <Cart/>}
     {gHead.loading && <div className='loading'>loading ...</div>}
     {gHead.pushMessage && <AlertBox text={gHead.pm} type={gHead.pt}/>
     }
   <Routes>
     <Route path='/' element={<Dashboard/>}/>
     <Route path='/update' element={<AddProduce/>}/>
     <Route path='/page' element={<ItemPage/>}/>
   </Routes>
   </div>
  ) :
   (
    <div>
      {gHead.loading && <div  className='loading'>loading ...</div>}
     {gHead.pushMessage && <AlertBox text={gHead.pm} type={gHead.pt}/>}

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
