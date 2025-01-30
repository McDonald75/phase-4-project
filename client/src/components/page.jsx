import Nav from "./nav"
import '../assets/style/page.css'
import { useState } from "react"
import Footer from "./footer"
import { useGiraf } from "../context"

const ItemPage = ()=>{
    const [counter, setCounter] = useState(0)
    const {gHead, addGHead} = useGiraf()
    return(
        <div className="page">
            <Nav/>
            <div className="propertyHolder">
                <div className="propImage"></div>
                <div className="propHold">
                    <p className="pag">Farmer's choice is here</p>
                    <p className="tt">Honey</p>
                    <p className="tp">Ksh 900</p>
                    <div className="counter">
                        <div className="cnt">
                        <p onClick={()=>{
                            if(counter > 0){
                                setCounter(t=>{
                                    return t-1
                                })
                            }
                        }}>-</p>
                        <p>{counter}</p>
                        <p onClick={()=>{
                            if(counter < 10){
                                setCounter(t=>{
                                    return t+1
                                })
                            }
                        }}>+</p>
                        </div>
                        <div className="add" onClick={()=>{
                            let d = gHead.cartItems | 0
                            addGHead('cartItems', d+1)
                        }}>ADD TO CART</div>
                    </div>
                    <p><span style={{
                        fontWeight:'700'
                    }}>Category</span> : category</p>
                     <p><span style={{
                        fontWeight:'700'
                    }}>Description</span>
                    <br/>
                     a long description a long description a long description a long description
                     a long description a long description a long description a long description
                     a long description a long description a long description a long description
                     a long description a long description a long description a long description
                     a long description a long description a long description a long description
                     a long description a long description a long description a long description
                     </p>

                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default ItemPage