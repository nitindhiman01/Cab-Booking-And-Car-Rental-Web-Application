import React, { Fragment, useRef, useState } from 'react';
import "./loginSignup.css";
import { Link } from "react-router-dom";
import MailOutLineIcon from "@material-ui/icons/MailOutLine";
import LockOpenIcon from "@material-ui/icons/LockOpen";


const loginSignup = () =>{

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const loginSubmit = () => {
        console.log("form submitted");
    }

    const switchTabs = (e, tab) =>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral"); 
            switcherTab.current.classList.remove("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");    
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToNeutral"); 
            switcherTab.current.classList.remove("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");    
        }
    };
    return(
        <Fragment>
            <div className = "loginSignup">
                <div className = "loginSignupBox">
                    <div>
                        <div className = "loginSignupToggle">
                            <p onClick = {(e) = switchTabs(e, "login")}>LOGIN</p>
                            <p onClick = {(e) = switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref = {switcherTab}></button>
                    </div>
                    <form className = "loginForm" ref={ loginTab } onSubmit={loginSubmit}>
                        <div className= "loginEmail">
                            <MailOutLineIcon />
                            <input 
                                type = "email"
                                placeholder = "Email"
                                required
                                value = {loginEmail}
                                onChange = {(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className = "loginPassword">
                            <LockOpenIcon />
                            <input 
                                type = "password"
                                placeholder = "Password"
                                required
                                value = {loginPassword}
                                onChange = {(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to ="/password/forgot">Forget Password ?</Link>
                        <input type = "submit" value="Login" className = "loginButton" />
                    </form>

                </div>
            </div>
        </Fragment>
    );
};


export default loginSignup;
