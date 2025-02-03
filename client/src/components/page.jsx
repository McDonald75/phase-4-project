import Nav from "./nav";
import "../assets/style/page.css";
import { useEffect, useState } from "react";
import Footer from "./footer";
import { useGiraf } from "../context";
import { useNavigate } from "react-router";

const ItemPage = () => {
  const [counter, setCounter] = useState(0);
  const { gHead, addGHead } = useGiraf();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(gHead.selected);
    if (!gHead.selected) return navigate("/");
  }, []);
  const addToCart = (counter) => {
    let d = gHead.cartList || [];
    gHead.selected.count = counter
    d.push(gHead.selected);
    addGHead('cartList',d)
  };
  return (
    <div className="page">
      <Nav />
      <div className="propertyHolder">
        <div className="propImage"></div>
        <div className="propHold">
          <p className="pag">Farmer's choice is here</p>
          <p className="tt">{gHead.selected?.name}</p>
          <p className="tp">Ksh {gHead.selected?.price_per_unit}</p>
          <div className="counter">
            <div className="cnt">
              <p
                onClick={() => {
                  if (counter > 0) {
                    setCounter((t) => {
                      return t - 1;
                    });
                  }
                }}
              >
                -
              </p>
              <p>{counter}</p>
              <p
                onClick={() => {
                  if (counter < 10) {
                    setCounter((t) => {
                      return t + 1;
                    });
                  }
                }}
              >
                +
              </p>
            </div>
            <div
              className="add"
              onClick={() => {
                let d = gHead.cartItems | 0;
                addGHead("cartItems", d + 1);
                addToCart(counter)
                navigate('/')
              }}
            >
              ADD TO CART
            </div>
          </div>
          <p>
            <span
              style={{
                fontWeight: "700",
              }}
            >
              Category
            </span>{" "}
            : category
          </p>
          <p>
            <span
              style={{
                fontWeight: "700",
              }}
            >
              Description
            </span>
            <br />
            {gHead.selected?.description}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ItemPage;
