import '../assets/style/login.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useGiraf } from '../context';
const LogIn = ()=>{
    const {gHead, addGHead} = useGiraf()
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
                <input type='text' placeholder='shellton@gmail.com'/>
                </div>
                <div className='input'>
                    <LockOpenIcon/>
                <input type='password' placeholder='*******'/>
                </div>
                <div className='input'>
                <input type='checkbox' placeholder='*******'/>
                <p>Merchant?</p>
                </div>
                <div className='button' onClick={()=>{
                    addGHead('loggedIn', true)
                }}>
                    Log In
                </div>
            </div>
        </div>
    )
}
export default LogIn