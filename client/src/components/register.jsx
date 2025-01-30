import "../assets/style/login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
const Register = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="logo"></div>
        <h4>Register</h4>
        <div
          className="input"
          style={{
            borderTop: "1px solid gray",
            paddingTop: "30px",
          }}
        >
          <MailOutlineIcon />
          <input type="text" placeholder="shellton@gmail.com" />
        </div>
        <div className="input">
          <LocalPhoneIcon />
          <input type="text" placeholder="0712345678" />
        </div>
        <div className="input">
          <LockOpenIcon />
          <input type="password" placeholder="password" />
        </div>
        <div className="input">
          <LockOpenIcon />
          <input type="password" placeholder="confirm password" />
        </div>

        
        <div className="input">
          <input type="checkbox" placeholder="*******" />
          <p>Merchant?</p>
        </div>
        <div className="button">Register</div>
      </div>
    </div>
  );
};

export default Register;
