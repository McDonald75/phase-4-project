import "../assets/style/login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { useNavigate } from "react-router";
const ProduceForm = ()=>{
  const navigate = useNavigate()
    return(
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
            <input type="text" placeholder="name of product" />
          </div>
          <div className="input">
            <PriceCheckIcon />
            <input type="text" placeholder="price" />
          </div>
          <div className="input">
            <ProductionQuantityLimitsIcon />
            <input type="number" placeholder="quantity" />
          </div>
          <div className="input">
            <ImageSearchIcon />
            <input type="text" placeholder="image" />
          </div>
          <div className="input" style={{
            marginTop:'50px'
          }}>
            <QrCodeScannerIcon />
            <textarea placeholder="description" />
          </div>
  
          <div className="button" onClick={()=>{
            navigate("/")
          }}>Save</div>
        </div>
      </div>
    )
}

export default ProduceForm