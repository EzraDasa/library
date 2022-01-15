import React from 'react'
import './css/Login.css'
import { useState,useRef,useContext } from 'react';
import API_KEY from './API_KEY';
import { SettingUser } from '../App';
import { SpinnerCircularFixed } from 'spinners-react'
import axios from "axios"


export default function Login() {
    const L_Storage_USER = "USER_email";
    const email = useRef("")
    const password = useRef("")
    const [isDisable,setIsDisable] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const setSignIn=useContext(SettingUser)
    const URL_LOGIN=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    return (
        <div>
            <form
            onChange={(evt)=>{
                if (email.current.value && (password.current.value.length > 5)) {
                    setIsDisable(true)
                }else{
                    setIsDisable(false)
                }
            }}
             onSubmit={(evt)=>{
                evt.preventDefault()
                setSpinner(true)
                axios.post(URL_LOGIN,{email:email.current.value,password:password.current.value})
                .then(function(res){ 
                    setSpinner(false)
                    setSignIn(res)
                    localStorage.setItem(L_Storage_USER,JSON.stringify(res))
                })
                .catch(function(err){
                    setSpinner(false)
                    setSignIn(err.response)
                    console.log(err.response||err);   
                })
            }}>
                <input ref={email} type="email" id="login" className="fadeIn second" name="login" placeholder="email"/>
                <input ref={password} type="password" id="password" className="fadeIn third" name="login" placeholder="password"/>
                <input style={{backgroundColor:isDisable?"#39ace7":"grey"}} type="submit" className="fadeIn fourth" value="Log in" disabled={!isDisable} /><br/>
                {spinner?<SpinnerCircularFixed/>:""}
            </form>

        </div>
    )
}
