import "../assets/style/login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useNavigate } from "react-router";
import { useState } from "react";
import usePostApi from "../hooks/postapi";
import appConfig from "../config";
import { useGiraf } from "../context";
const ProduceForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price_per_unit, setPricePerUnit] = useState();
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState();
  const { actionRequest } = usePostApi();
  const {gHead} = useGiraf()

  const actionSaveProduct = () => {
    if (!name || !description || !price_per_unit || !quantity || !image)
      return alert("you must privide all fields");
    addGHead('loading', true)

    actionRequest({
      endPoint: `${appConfig.api.API_URL}products`,
      params: {
        name,
        description,
        price_per_unit,
        quantity_available:quantity,
        user_id:gHead.user.id,
        na:image,
      },
    }).then(res=>{
      alert('product created')
      navigate('/')
    }).catch(err=>{
      alert(err.message)
    }).finally(()=>{
      addGHead('loading', false)

      });
  };
  return (
    <div className="login produceform">
      <div className="container">
        <h4>Update Produce</h4>
        <div
          className="input"
          style={{
            borderTop: "1px solid gray",
            paddingTop: "30px",
          }}
        >
          <DriveFileRenameOutlineIcon />
          <input
            type="text"
            placeholder="name of product"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <PriceCheckIcon />
          <input
            type="text"
            placeholder="price"
            onChange={(e) => {
              setPricePerUnit(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <ProductionQuantityLimitsIcon />
          <input
            type="number"
            placeholder="quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <ImageSearchIcon />
          <input
            type="text"
            placeholder="image"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <div
          className="input"
          style={{
            marginTop: "50px",
          }}
        >
          <QrCodeScannerIcon />
          <textarea
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div
          className="button"
          onClick={() => {
           actionSaveProduct()
          }}

        >
          Save
        </div>
      </div>
    </div>
  );
};

export default ProduceForm;
