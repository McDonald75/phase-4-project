
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DvrIcon from "@mui/icons-material/Dvr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from "@mui/icons-material/Logout";
import { useGiraf } from "../context";
import AddCardIcon from '@mui/icons-material/AddCard';
const Nav = ()=>{
    const [isSticky, setIsSticky] = useState(false);
    const {gHead, addGHead} = useGiraf()
    const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Change when scrolled 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return(
        <div
        className="nav"
        style={{
          position: isSticky ? "fixed" : "relative",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          boxShadow: isSticky ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
          padding: "10px 20px",
          zIndex: 1000,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="logo" onClick={()=>{
            navigate('/')
        }}></div>
        <div className="menu">
          {/* <div className='n'>Home</div> */}
          {/* <div className='n'>Cart</div>
                    <div className='n'>Orders</div> */}
        </div>
        <div className="cart">
        <Badge badgeContent={gHead.orderItems | 0} onClick={()=>{
            navigate('/update')
          }}>
            <AddCardIcon />
          </Badge>
          <Badge badgeContent={gHead.orderItems | 0} onClick={()=>{
            addGHead("orders", true)
          }}>
            <DvrIcon />
          </Badge>

          <Badge badgeContent={gHead.cartItems | 0} onClick={()=>{
            addGHead("cart", true)
          }}>
            <ShoppingCartIcon />
          </Badge>
          <Avatar alt="Shellton" src="/static/images/avatar/1.jpg"  sx={{
            marginLeft:'30px'
          }}/>
          <div className="lgout" onClick={()=>{
            addGHead('loggedIn', false)
            navigate("/")
          }} style={{
            cursor:'pointer'
          }}>
            {/* <Logout size="25px" sx={{
                // marginTop:'20px'
            }}/> */}
            Log Out
          </div>
        </div>
      </div>
    )
}

export default Nav