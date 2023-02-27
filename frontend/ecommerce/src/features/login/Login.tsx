import { useEffect, useState } from 'react'
import { loginAsync, registerAsync, selectUser } from "../login/loginSlice"
import { useAppDispatch } from "../../app/hooks"
import { useSelector } from 'react-redux'
import Admin from '../adminTools/Admin'
import "./login.css"



import { toast, ToastContainer } from 'react-toastify';

const Login = () => {

  const currentUser: string = useSelector(selectUser)
  const dispatch = useAppDispatch()
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [pwd_confirm, setpwd_confirm] = useState("")
  const [address, setaddress] = useState("")
  const [phoneNum, setphoneNum] = useState("")
  const [email, setemail] = useState("")
  const [reg_flag, setreg_flag] = useState(false)

  const handleReg = () => {
    dispatch(registerAsync({ username, password, address, "phone_number": phoneNum, email }))
    setreg_flag(!reg_flag)
  }

  return (
    // will show login form only if currentUser is empty
    <div>
      <div style={{ padding: "50px", textAlign: "center" }}>
        {/* ################################### register form ################################### */}
        <div className='reg_popup' style={reg_flag ? {} : { display: "none" }}>
          <span className='x_btn' onClick={() => setreg_flag(false)}>X</span>
          <h2>register</h2>
          <input onChange={(e) => setaddress(e.target.value)} placeholder='Address' type='email' /><br /><br />
          <input onChange={(e) => setemail(e.target.value)} placeholder='Email' type='text' /><br /><br />
          <input onChange={(e) => setphoneNum(e.target.value)} placeholder='Phone Number' type='tex' /> <br /><br />
          <input onChange={(e) => setusername(e.target.value)} placeholder='User Name' type={'email'} /><br /><br />
          <input onChange={(e) => setpassword(e.target.value)} placeholder='Password' type='password' /><br /><br />
          <input onChange={(e) => setpwd_confirm(e.target.value)} placeholder='Confirm Password' type='password' /> <br /><br />

          <div style={password != pwd_confirm ? {} : { display: "none" }}>passwords don't match</div>
          <button style={password != pwd_confirm ? { cursor: "not-allowed", pointerEvents: "none" } : {}} onClick={() => handleReg()}>register</button>
        </div>
        {/* ################################### login form ################################### */}
        <div className='login_box'>
          <div style={currentUser ? { display: "none" } : {}}>
            <input placeholder='UserName' type="text" onChange={(e) => setusername(e.target.value)} /><br /><br />
            <input placeholder='Password' type="password" onChange={(e) => setpassword(e.target.value)} /><br /><br />
            <div className='login_btn' onClick={() => dispatch(loginAsync({ username, password }))}>Log In</div>
            <br /><br /><div onClick={() => setreg_flag(true)} className='account_btn'>Create an Account</div>
          </div>
        </div>


        {/* will show options for admin user - add produts and so on from Admin component  */}
        <div style={currentUser === "admin" ? {} : { display: "none" }}>
          <Admin />
        </div>
      </div>
    </div>
  )
}

export default Login