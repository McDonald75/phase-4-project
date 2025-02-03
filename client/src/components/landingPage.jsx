import "../assets/style/dashboard.css";
import { useEffect, useState } from "react";
import Nav from "./nav";
import Footer from "./footer";
import { useNavigate } from "react-router";
import useGetApi from "../hooks/getapi";
import appConfig from "../config";
import usePostApi from "../hooks/postapi";
import { useGiraf } from "../context";
const Dashboard = () => {
  const [testArray, setTestArray] = useState("testarray");
  const [products, setProducts] = useState([])
  const {addGHead} = useGiraf()
  const navigate = useNavigate()
  const {actionRequest} = usePostApi()
  useEffect(()=>{
    addGHead('loading', true)
    actionRequest({endPoint:`${appConfig.api.API_URL}products/all`}).then(res=>{
      setProducts(res.data)
    }).catch(err=>{
      console.log(err)
      alert('error getting products')
    }).finally(()=>{
      addGHead('loading', false)

      })

  },[])

  return (
    <div className="dashboard">
      <Nav/>
      <div className="mid"></div>
      <div className="banner">
        <div className="rectangle"></div>
        <div className="quote">Nature's Cleansing Secret.</div>
        <div className="image"></div>
      </div>
      <div className="header">
        <h1>Our Proucts</h1>
        <div className="divider"></div>
        <p>
          Find all our farm produce with amazing products, with many variations
        </p>
      </div>
      <div className="lister">
        {products.map((l) => {
          return (
            <div key={l.id} className="listerBox" onClick={()=>{
              addGHead('selected', l)
              navigate("page")
            }}> 
              <div className="listerImage"></div>
              <h5 className="listerTitle">Product Title</h5>
              <h5 className="listerPrice">Ksh 200</h5>
            </div>
          );
        })}
      </div>
     <Footer/>
    </div>
  );
};

export default Dashboard;
