import '../assets/style/login.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useGiraf } from '../context';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import useGetApi from '../hooks/getapi';
import appConfig from '../config';
import usePostApi from '../hooks/postapi';
import Cookies from 'js-cookie'
import usePushMessage from '../hooks/pushmessage';
const LogIn = ()=>{
    const {gHead, addGHead} = useGiraf()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole]  = useState('BUYER')
    const {actionRequest} = usePostApi()
    const navigate = useNavigate()
    const {pushMessage} = usePushMessage()
    const handleLogIn = () => {
        if(!email || !password) return alert('missing fields')
        addGHead('loading', true)
          actionRequest({endPoint:`${appConfig.api.API_URL}user/auth`, params:{
            email,
            password,
            role
          }}).then((res)=>{
            // alert(res.data.message)
            console.log(res)
            addGHead('loggedIn', true)
            addGHead('user', res.data)
            Cookies.set("user", JSON.stringify(res.data))
            console.log(res.data)
            navigate('/')
          }).catch((err)=>{
            pushMessage("login in failed", 'error')
            
          }).finally(()=>{
            addGHead('loading', false)
    
            })
      };
    return(
        <div className="login">
            <div className="container">
                <div className="logo"></div>
                <h4>Log In</h4>
                <div className='input' style={{
                    borderTop:'1px solid gray',
                    paddingTop:'30px'
                }}>
                    <MailOutlineIcon/>
                <input type='text' placeholder='shellton@gmail.com' onChange={e=>{
                setEmail(e.target.value)
                }}/>
                </div>
                <div className='input'>
                    <LockOpenIcon/>
                <input type='password' placeholder='*******' onChange={e=>{
                setPassword(e.target.value)
                }}/>
                </div>
                <div className='input'>
                <input type='checkbox' placeholder='*******' onChange={e=>{
                    if(e.target.checked) setRole('FARMER')
                    setRole('BUYER')
                }}/>
                <p>Merchant?</p>
                </div>
                <div className='button' onClick={()=>{
                    handleLogIn()
                }}>
                    Log In
                </div>
                <div style={{
                    fontStyle:'italic',
                    fontSize:'13px',
                    cursor:'pointer'
                }}
                onClick={()=>{
                    navigate('/register')
                }}
                >not a user?</div>
            </div>
        </div>
    )
}
export default LogIn