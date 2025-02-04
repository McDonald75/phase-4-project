import { useEffect, useState } from 'react'
import '../assets/style/cart.css'
import { useGiraf } from '../context'
import useGetApi from '../hooks/getapi'
import appConfig from '../config'
import usePushMessage from '../hooks/pushmessage'
import usePostApi from '../hooks/postapi'
const Orders = ()=>{
    const [string, setString] = useState("shellton")
    const {gHead, addGHead} = useGiraf()
    const {actionRequest} = useGetApi()
    const {actionRequest:postActionRequest} = usePostApi()
    const {pushMessage} = usePushMessage()
    const [orders, setOrders] = useState([])
    const [focusedOrder, setFocusedOrder] = useState()
    const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
        addGHead('loading', false)
        actionRequest({endPoint:`${appConfig.api.API_URL}orders/farmer/${gHead.user.id}`}).then(res=>{
            console.log(res)
            setOrders(res.data)
        }).catch(err=>{
            pushMessage(err.message, 'error')
        }).finally(()=>{
            addGHead('loading', false)
        })
        return setRefresh(false)
    },[refresh])
    const changeOrderStatus = (status)=>{
        addGHead('loading', true)
        postActionRequest({endPoint:`${appConfig.api.API_URL}orders/status`, params:{
            id:focusedOrder.id,
            status
        }}).then((res)=>{
            pushMessage(res.message, 'success')
            setFocusedOrder(res.data)
            setRefresh(true)
        }).catch((err)=>{
            pushMessage(err.message, 'error')
        }).finally(()=>{
            addGHead('loading', false)
        })
    }
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
                        orders?.map(l=>{
                            return(
                                <div className='catLister' key={l.id} onClick={()=>{
                                    setFocusedOrder(l)
                                }}
                                style={{
                                    backgroundColor: focusedOrder?.id == l.id ? 'rgb(223, 223, 223)' : ''
                                }}
                                >
                                    <div className='clImage'></div>
                                    <div className='clProp'>
                                        <p>order : {l.id}</p>
                                        <p>x{l.quantity_ordered} Ksh {l.total_price}</p>
                                    </div>
                                    {/* <div className='clremove'>x</div> */}

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
                    }}>Status :</span> {focusedOrder?.status}</p>
                    {focusedOrder?.status == 'PENDING' && <div className='actions'>
                        <div className='button' onClick={()=>{
                            changeOrderStatus('ACCEPTED')
                        }}>Accept</div>
                        <div className='button' onClick={()=>{
                            changeOrderStatus('DECLINED')
                        }}>Reject</div>
                    </div>}
                    {focusedOrder?.status == 'ACCEPTED' && <div className='actions'>
                        <div className='button' onClick={()=>{
                            changeOrderStatus('COMPLETED')
                        }}>Complete Order</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Orders