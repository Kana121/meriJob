import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Otp.module.css'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
const Otp = () => {

    const [enteredotp, setenteredOtp] = useState("")
    const [error, seterror] = useState("")
    const [loading, setloading] = useState(false)
    const navigate=useNavigate()
    const otp=useRef()
    useEffect(() => {
        sendOtp();
    },[otp])

    // var otp;
    var sendOtp=()=>{
        setTimeout(()=>{
            otp.current = Math.floor(Math.random() * 900000) + 99999;
            console.log(otp.current)
            alert(otp.current);
        },3000)
    }
    
    
    
   const handlePayment=()=>{
    
      if(otp.current==enteredotp)
      { 
        setloading(true)
        seterror(false)
        setTimeout(function(){
            setloading(false)
           navigate("/confirmation")
        },3000)
      }
   }


  return (
    <div>
        <div className={style.loading}>{loading ? <img src="https://i.gifer.com/origin/9e/9eb95f634cef84f81f2d4d9929441f53_w200.webp" alt="" /> : ""} </div>
    <div className={loading ? style.loadingback : ""}>
 
<div className={style.totaldiv}> <div className={style.container}>
        <div className={style.img} >
            <div className={style.img1} > <img src="https://www.pngfind.com/pngs/m/421-4212494_we-accept-payments-verified-by-visa-new-logo.png" alt=""/></div>
            <div className={style.img2}> <img src="data:image/png;base64,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" alt=""/></div>
        </div>

    <div className={style.merchant} >
        <div className={style.subdiv}>
            <div>Merchant</div>
            <div>Transaction Amount</div>
            <div>SBI Debit Card</div>
        </div>
        <div className={style.subdiv2} >
            <div >: MeriJobIndiaPvtRazorPay</div>
            <div className={style.priceTotal} >: ₹ 1,412</div>
            <div>: 4786xxxx xxxx xx00</div>
        </div>
    </div>
             

         <div className={style.otp}>
            <div className={style.Authentic}>Authenticate Payment</div>
            <div>OTP sent to your mobile number ending <b>88xx7xxx88</b> </div>
            <p>Enter One Time Password (OTP)</p>
            <div className={style.ip}>
                <input maxLength="6"  className={style.input1} onChange={(e)=>setenteredOtp(e.target.value)} autoComplete="off" type="text" />
                <button className={style.btnpay} onClick={handlePayment}>Make Payment</button>
            </div>
            <div className={style.error} >
                <div className={style.errorMsg}>{error ? <div>Invalid OTP</div> : ""}</div>
                <div className={style.resend} onClick={()=>sendOtp()}>Resend OTP</div> 
            </div>
            
            <p>Click here to abort transaction and go back to merchant site</p>
         </div>
         <div className={style.PCI}>
             <span><i className="fa-solid fa-lock"></i></span> PCI DSS Certified
         </div>
         <div className={style.last}>
             <span className={style.red}>Important -</span> To activate your SBI debit card for online transactions (if you are a new SBI customer or haven't transacted online after June 01, 2015), please send an sms <b>SWON</b><b>ECOM</b> <b>XXXX to 09223966666</b>  (where XXXX is the last 4 digits of your SBI Debit Card) from your registered mobile number.
         </div>
        </div></div>


        <div className={style.loadinggifdiv}>
            <img src="https://media4.giphy.com/media/Qc8UoA7NJqx70SfiCL/giphy.gif?cid=ecf05e47e49q0fa8nswiqq10s4p0kije6g2zwkth73xdoqbj&rid=giphy.gif&ct=g" alt="" />
        </div>

    </div>
    </div>
  )
}

export default Otp