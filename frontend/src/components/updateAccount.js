import React, {useEffect, useState} from 'react';
import ErrorLog from './errorLog';
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from "@mui/icons-material/Face";
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, updateProfile } from '../actions/userActions'; 
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../constants/userConstants';
import "../stylesheets/updateUser.css";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {isAuthenticated, user} = useSelector((state) => state.user);
    const {error, isUpdated, loading, alertUser} = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const userid = user._id;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("./profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        myForm.set("userid", userid);

        dispatch(updateProfile(myForm));
        
    }

    const updateProfileDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => {

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully");
            navigate('/account');

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
 
    }, [isUpdated, dispatch, error, alert, user]);

  return (
    <div>
        {isAuthenticated ? (
            <div className = "updateSignUp">
                <div className = "updateUserBox">
                    <h2>Update Profile</h2>

                    <form className='updateUserForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                        <div className='updateName'>
                            <FaceIcon />
                            <input 
                                type="text"
                                placeholder='Name'
                                required
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='updateEmail'>
                            <MailOutlineIcon />
                            <input 
                                type = "email"
                                placeholder = "Email"
                                required
                                name='email'
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div id="updateImage">
                            <img src={avatarPreview} alt='Avatar Preview' />
                            <input 
                                type='file'
                                name='avatar'
                                accept="image/*"
                                onChange={updateProfileDataChange}
                            />
                        </div>
                        <input 
                            type='submit'
                            value="Update"
                            className='updateButton'
                            disabled={loading ? true : false}
                        />
                        
                    </form>
                </div>
            </div>
            ) : <ErrorLog />}
    </div>
  )
}

export default UpdateProfile