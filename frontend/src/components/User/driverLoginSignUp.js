import React, { Fragment, useRef, useState, useEffect } from 'react';
import "./loginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CategoryIcon from '@mui/icons-material/Category';
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, login, register } from '../../actions/driverActions'; 
// import { useAlert } from "react-alert";


const DriverLoginSignup = () =>{
    const dispatch = useDispatch();
    // const alert = useAlert();
    let navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector((state) => state.driver);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [driver, setDriver] = useState({
        name: "",
        email: "",
        password: "",
        carName: "",
        plate_no: "",
        car_category: ""
    });

    const {name, email, password, carName, plate_no, car_category} = driver;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("./profile.png");



    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        myForm.set("carName", carName);
        myForm.set("plate_no", plate_no);
        myForm.set("car_category", car_category);

        dispatch(register(myForm));
        
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setDriver({ ...driver, [e.target.name]: e.target.value});
        }
    };

    useEffect(() => {
        // if(error) {
        //     alert.error(error);
        //     dispatch(clearErrors());
        // }

        if(isAuthenticated){
            // history.push("/account");
            navigate('/');
        }
 
    }, [isAuthenticated]);
//dispatch, error, alert

    const switchTabs = (e, tab) =>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral"); 
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");    
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight"); 
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");    
        }
    };
    return(
        <Fragment>
            <div className = "loginSignup">
                <div className = "loginSignupBox">
                    <div>
                        <div className = "loginSignupToggle">
                            <p onClick = {(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick = {(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref = {switcherTab}></button>
                    </div>
                    <form className = "loginForm" ref={ loginTab } onSubmit={loginSubmit}>
                        <div className= "loginEmail">
                            <MailOutlineIcon />
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
                    <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            <FaceIcon />
                            <input 
                                type="text"
                                placeholder='Name'
                                required
                                name='name'
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='signUpEmail'>
                            <MailOutlineIcon />
                            <input 
                                type = "email"
                                placeholder = "Email"
                                required
                                name='email'
                                value = {email}
                                onChange = {registerDataChange}
                            />
                        </div>
                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input 
                                type = "password"
                                placeholder = "Password"
                                required
                                name="password"
                                value = {password}
                                onChange = {registerDataChange}
                            />
                        </div>
                        <div className='signUpCar'>
                            <DirectionsCarIcon />
                            <input 
                                type = "text"
                                placeholder = "Car Name"
                                required
                                name="carName"
                                value = {carName}
                                onChange = {registerDataChange}
                            />
                        </div>
                        <div className='signUpCarPlate'>
                            <ConfirmationNumberIcon />
                            <input 
                                type = "text"
                                placeholder = "Car Plate Number"
                                required
                                name="plate_no"
                                value = {plate_no}
                                onChange = {registerDataChange}
                            />
                        </div>
                        <div className='signUpCarcategory'>
                            <CategoryIcon />
                            <input 
                                type = "text"
                                placeholder = "Car Category"
                                required
                                name="car_category"
                                value = {car_category}
                                onChange = {registerDataChange}
                            />
                        </div>
                        

                        <div id="registerImage">
                            <img src={avatarPreview} alt='Avatar Preview' />
                            <input 
                                type='file'
                                name='avatar'
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input 
                            type='submit'
                            value="Register"
                            className='signUpButton'
                            disabled={loading ? true : false}
                        />
                        
                    </form>
                </div>
            </div>
        </Fragment>
    );
};


export default DriverLoginSignup;
