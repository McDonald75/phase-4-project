import { useState } from 'react'
import '../assets/style/cart.css'
import { useGiraf } from '../context'
const Orders = ()=>{
    const [string, setString] = useState("shellton")
    const {addGHead} = useGiraf()
    return(
        <div className='cartPage'>
            <div className='side'>
                <div className='top'>
                    <div className='hd'>
                        <h2>Your Orders</h2>
                        <p onClick={()=>{
                            addGHead('orders', false)
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
                    {/* <p><span style={{
                        fontWeight:600
                    }}>Order :</span> Complete</p> */}
                    <p><span style={{
                        fontWeight:600
                    }}>Status :</span> Complete</p>
                </div>
            </div>
        </div>
    )
}

export default Orders