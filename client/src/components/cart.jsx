import { useEffect, useState } from 'react'
import '../assets/style/cart.css'
import { useGiraf } from '../context'
import { useNavigate } from 'react-router'
import usePostApi from '../hooks/postapi'
import appConfig from '../config'
const Cart = ()=>{
    const [string, setString] = useState("shellton")
    const [cartList, setCartList] = useState([])
    const {gHead, addGHead} = useGiraf()
    const {actionRequest} = usePostApi()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(gHead.cartList)
        gHead.cartList && setCartList(gHead.cartList)
    },[])

    const actionCheckOut = ()=>{
        actionRequest({endPoint:`${appConfig.api.API_URL}orders`, params:{
            user_id:gHead.user.id,
            quantity_ordered:1,
            total_price: 8,
            status:'PENDING'
        }}).then(res=>{
            alert('order created')
            addGHead('cart', false)
        }).catch(res=>{
            alert('error on order')
        })
    }

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
                        cartList.map(l=>{
                            return(
                                <div key={l.id} className='catLister'>
                                    <div className='clImage'></div>
                                    <div className='clProp'>
                                        <p>{l?.name}</p>
                                        <p>{l?.count} x Ksh {l?.price_per_unit}</p>
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
                    }}>{gHead.cartList.reduce((accumulator, item) => {
                        return accumulator + (item.price_per_unit * item.count);
                      }, 0)}</span>Ksh</h5>
                    <div className='button'
                    onClick={()=>{
                        actionCheckOut()
                    }}
                    >CHECKOUT</div>
                </div>
            </div>
        </div>
    )
}

export default Cart