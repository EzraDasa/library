import React from 'react'
import Login from './Login';
import Register from './Register';
import { useState } from 'react'

export default function LoginOrRegister({setSignIn}) {
    const [loginOrRegister,setLoginOrRegister] = useState(false)
    
    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">

                <div className="fadeIn first">
                    <button onClick={()=>{
                        setSignIn(false)
                        setLoginOrRegister(!loginOrRegister)
                    }} disabled={!loginOrRegister}>Login</button>
                    <button onClick={ ()=>{
                        setSignIn(false)
                        setLoginOrRegister(!loginOrRegister)
                    }} disabled={loginOrRegister}>Register</button>
                </div>
                <h2>welcome to the library</h2>
                {loginOrRegister?<Register setSignIn={setSignIn}/>:<Login setSignIn={setSignIn}/>}

                </div>
            </div>
        </div>
    )
}
