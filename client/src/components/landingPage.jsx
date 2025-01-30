import "../assets/style/dashboard.css";
import { useEffect, useState } from "react";
import Nav from "./nav";
import Footer from "./footer";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const [testArray, setTestArray] = useState("testarray");
  const navigate = useNavigate()
  

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
        {testArray.split("").map((l) => {
          return (
            <div className="listerBox" onClick={()=>{
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
