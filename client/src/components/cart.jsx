import { useState } from 'react'
import '../assets/style/cart.css'
import { useGiraf } from '../context'
const Cart = ()=>{
    const [string, setString] = useState("shellton")
    const {addGHead} = useGiraf()
    return(
        <div className='cartPage'>
            <div className='side'>
                <div className='top'>
                    <div className='hd'>
                        <h2>Shopping Cart</h2>
                        <p onClick={()=>{
                            addGHead('cart', false)
                        }}>x</p>
                    </div>
                    <div style={{
                        height:'80px'
                    }}></div>
                    {
                        string.split("").map(l=>{
                            return(
                                <div className='catLister'>
                                    <div className='clImage'></div>
                                    <div className='clProp'>
                                        <p>Honey</p>
                                        <p>1 x Ksh 200</p>
                                    </div>
                                    <div className='clremove'>x</div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className='bottom'>
                    <h2>Total</h2>
                    <h5 style={{
                        marginTop:'-15px'
                    }}><span style={{
                        fontSize:'30px'
                    }}>300</span>Ksh</h5>
                    <div className='button'>CHECKOUT</div>
                </div>
            </div>
        </div>
    )
}

export default Cart