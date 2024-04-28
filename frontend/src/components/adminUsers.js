import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, clearErrors } from '../actions/userActions';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import GoBackButton from './goBackButton';
import MetaData from './layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import "../stylesheets/myBookings.css";
import { Link } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import { DELETE_USER_RESET } from '../constants/userConstants';

const AdminUsers = () => {

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const {error, users} = useSelector(state => state.users);
    const {error: deleteError, isDeleted} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    function deleteUserHandler(id){
        dispatch(deleteUser(id));
    }

    const columns = [
        {field: "id", headerName: "User ID", minWidth: 200, flex: 1},
  
        {
          field: "name",
          headerName: "Name",
          minWidth: 120,
          flex: 0.5,
        },
        {
          field: "email",
          headerName: "Email",
          minWidth: 120,
          flex: 0.5,
        },
        {
          field: "role",
          headerName: "Role",
          minWidth: 200,
          flex: 1,
        },
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/user/${params.id}`}>
                  <EditIcon sx={{paddingTop: "10px"}} />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.id)
                  }
                  sx={{color: "inherit"}}
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        }
  
      ];
  
      const rows = [];
  
      users && users.forEach((user, index) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        });
      });



    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("User Deleted Successfully");
            navigate("/admin/allusers", {replace: true});
            dispatch({ type: DELETE_USER_RESET });
          }

        dispatch(getAllUsers(user.role));
    }, [dispatch, alert, navigate, error, deleteError, isDeleted])

  return (
    <div>
         { (user.role === "admin" && isAuthenticated) ? (
            <div className='bookings-page'>
                <MetaData title="Admin Bookings"></MetaData>
                <div className='go-back'>
                  <GoBackButton />
                </div>
                <div className='user-bookings'>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableRowSelectionOnClick
                    className='booking-table'
                    autoHeight
                  />
                </div>
                <Typography id="booking-heading">All Users</Typography>
            </div>
            ) : (<p>You are not an admin</p>) }
    </div>
  )
}

export default AdminUsers