import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { DELETE_DRIVER_RESET } from '../constants/userConstants';
import { deleteDriver, getAllDrivers, clearErrors } from '../actions/driverActions';

const AdminDrivers = () => {

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const {error, drivers} = useSelector(state => state.drivers);
    const {error: deleteError, isDeleted} = useSelector(state => state.driverProfile);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    function deleteUserHandler(id){
        dispatch(deleteDriver(id));
    }

    const columns = [
        {field: "id", headerName: "Driver ID", minWidth: 200, flex: 1},
  
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
            field: "carName",
            headerName: "Car",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "plate_no",
            headerName: "Plate No.",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "car_category",
            headerName: "Car Category",
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
                <Link to={`/admin/driver/${params.id}`}>
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
  
      drivers && drivers.forEach((driver, index) => {
        rows.push({
          id: driver._id,
          name: driver.name,
          email: driver.email,
          role: driver.role,
          carName: driver.carName,
          plate_no: driver.plate_no,
          car_category: driver.car_category
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
            alert.success("Driver Deleted Successfully");
            navigate("/admin/alldrivers", {replace: true});
            dispatch({ type: DELETE_DRIVER_RESET });
          }

        dispatch(getAllDrivers(user.role));
    }, [dispatch, alert, navigate, error, deleteError, isDeleted])

  return (
    <div>
         { (user.role === "admin" && isAuthenticated) ? (
            <div className='bookings-page'>
                <MetaData title="All Drivers"></MetaData>
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
                <Typography id="booking-heading">All Drivers</Typography>
            </div>
            ) : (<p>You are not an admin</p>) }
    </div>
  )
}

export default AdminDrivers