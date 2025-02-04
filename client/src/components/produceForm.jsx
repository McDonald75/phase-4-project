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
import { useEffect, useState } from "react";
import usePostApi from "../hooks/postapi";
import appConfig from "../config";
import { useGiraf } from "../context";
import usePushMessage from "../hooks/pushmessage";
const ProduceForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price_per_unit, setPricePerUnit] = useState();
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState();
  const { actionRequest } = usePostApi();
  const {gHead, addGHead} = useGiraf()
  const [editFocus, setEditFocus] = useState(false)
  const {pushMessage} = usePushMessage()

  useEffect(()=>{
    if(gHead.editFocus){
      setEditFocus(true)
      setName(gHead.editFocus.name)
      setDescription(gHead.editFocus.description)
      setPricePerUnit(gHead.editFocus.price_per_unit)
      setQuantity(gHead.editFocus.quantity_available)
      setImage(gHead.editFocus.na)
    }
  },[])
  const actionSaveProduct = () => {
    console.log(name, description, price_per_unit, quantity, image)
    if (!name || !description || !price_per_unit || !quantity || !image)
      return alert("you must privide all fields");
    addGHead('loading', true)

    actionRequest({
      endPoint: `${appConfig.api.API_URL}products${editFocus? '/update': ''}`,
      params: {
        id:gHead.editFocus?.id,
        name,
        description,
        price_per_unit,
        quantity_available:quantity,
        user_id:gHead.user.id,
        na:image,
      },
    }).then(res=>{
      pushMessage(`product ${editFocus? 'updated':'created'}`, 'success')

      navigate('/')
    }).catch(err=>{
      pushMessage(err.message, 'error')
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
            value={name}
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
            value={price_per_unit}
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
            value={quantity}
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
            value={image}
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
            value={description}
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
