import React, {useEffect, useState} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getDriverDetails, updateDriver, clearErrors, } from '../actions/driverActions';
import { UPDATE_DRIVER_RESET } from '../constants/userConstants';
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from "@mui/material/Button";
import "../stylesheets/updateUser.css";

const UpdateDriverAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {id} = useParams()

    const { loading, error, driver : driverdetails } = useSelector((state) => state.driverDetails);

    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.driverProfile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const {user, isAuthenticated} = useSelector(state => state.user);

    const userRole = user.role;

    useEffect(() => {
        if (driverdetails && driverdetails._id !== id) {
          dispatch(getDriverDetails(id, userRole));
        } else {
          setName(driverdetails.name);
          setEmail(driverdetails.email);
          setRole(driverdetails.role);
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
          alert.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("User Updated Successfully");
          navigate("/admin/alldrivers");
          dispatch({ type: UPDATE_DRIVER_RESET });
        }
      }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

      const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        myForm.set("userRole", userRole);
    
        dispatch(updateDriver(id, myForm));
      };

  return (
    <div>
        {(user.role === "admin" && isAuthenticated) ? (
            <div className = "updateSignUp">
                <div className = "updateUserBox">
                    <form
                    className='updateUserForm'
                    onSubmit={updateUserSubmitHandler}
                    >
                    <h1>Update User</h1>

                    <div className='updateName'>
                        <PersonIcon />
                        <input
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div  className='updateEmail'>
                        <MailOutlineIcon />
                        <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='updateRole'>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Choose Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        </select>
                    </div>

                    <Button
                        className='updateButton'
                        type="submit"
                        disabled={
                        updateLoading ? true : false || role === "" ? true : false
                        }
                    >
                        Update
                    </Button>
                    </form>
                </div>
            </div>
            ) : <p>You are not an admin</p>}
    </div>
  )
}

export default UpdateDriverAdmin