import "../assets/style/login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Person3Icon from "@mui/icons-material/Person3";
import { useNavigate } from "react-router";
import { useState } from "react";
import AlertBox from "./alert";
import usePostApi from "../hooks/postapi";
import appConfig from "../config";
import { useGiraf } from "../context";
import usePushMessage from "../hooks/pushmessage";
import Cookies from 'js-cookie'
const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState('BUYER')
  const {actionRequest} = usePostApi()
  const {gHead, addGHead} = useGiraf()
  const {pushMessage} = usePushMessage()

  const alertBox = (type, message) => {
    type == "error" ? setError(true) : setSuccess(true);
    alert()

    setMessage(message)
    setTimeout(() => {
      setError(false);
      setSuccess(false);
      setMessage("");
    }, 1000);
  };

  // const navigate = useNavigate()
  const register = () => {
    if(!name || !email || !phone || !password) return alert('missing fields')
    if (password != confirmPassword) return alert('password must match')
      addGHead('loading', true)

      actionRequest({endPoint:`${appConfig.api.API_URL}user/register`, params:{
        name,
        email,
        phone_number:phone,
        password,
        role
      }}).then((res)=>{
        pushMessage(res.message, 'success')
        addGHead('loggedIn', true)
        addGHead('user', res.data)
        Cookies.set("user", JSON.stringify(res.data))

        navigate('/')
      }).catch((err)=>{
        // alert(err.message)
        pushMessage(err.message, 'error')
        
      }).finally(()=>{
        addGHead('loading', false)

        })
  };
  return (
    <div className="login">
      {error && <AlertBox text={message} type={error?'error':success?'success':''} />}
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
          <Person3Icon />
          <input type="text" placeholder="shellton omondi" 
          onChange={(e)=>{
            setName(e.target.value)
          }}/>
        </div>
        <div className="input">
          <MailOutlineIcon />
          <input type="text" placeholder="example@gmail.com" 
          onChange={(e)=>{
            setEmail(e.target.value)

          }}/>
        </div>
        <div className="input">
          <LocalPhoneIcon />
          <input type="text" placeholder="0712345678" 
          onChange={(e)=>{
            setPhone(e.target.value)


          }}/>
        </div>
        <div className="input">
          <LockOpenIcon />
          <input type="password" placeholder="password" 
          onChange={(e)=>{
            setPassword(e.target.value)


          }}/>
        </div>
        <div className="input">
          <LockOpenIcon />
          <input type="password" placeholder="confirm password" 
          onChange={(e)=>{
            setConfirmPassword(e.target.value)


          }}/>
        </div>

        <div className="input">
          <input type="checkbox" placeholder="*******" 
          onChange={(e)=>{
            if(e.target.checked)return setRole('FARMER')
              return setRole('BUYER')
            
          }}/>
          <p>Merchant?</p>
        </div>
        <div
          className="button"
          onClick={() => {
            register();
          }}
        >
          Register
        </div>
        <div
          style={{
            fontStyle: "italic",
            fontSize: "13px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          already have an account?
        </div>
      </div>
    </div>
  );
};

export default Register;
