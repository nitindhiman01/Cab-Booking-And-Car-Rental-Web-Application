import React, {useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminBookings, clearErrors } from '../actions/userActions';
import GoBackButton from './goBackButton';
import MetaData from './layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import "../stylesheets/myBookings.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBooking, clearErrors as deleteClearError } from '../actions/rentActions';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { DELETE_BOOKING_RESET } from '../constants/rentCarConstants';

const AdminBookings = () => {

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, adminBookings} = useSelector(state => state.adminBookings);
    const {error : deleteError, isDeleted} = useSelector(state => state.deleteBooking);

    const deleteOrderHandler = (id) => {
        dispatch(deleteBooking(id));
    }

    const columns = [
      {field: "id", headerName: "Booking ID", minWidth: 200, flex: 1},

      {
        field: "location",
        headerName: "Location",
        minWidth: 120,
        flex: 0.5,
      },
      {
        field: "package",
        headerName: "Package",
        minWidth: 120,
        flex: 0.5,
      },
      {
        field: "carid",
        headerName: "Car ID",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "userid",
        headerName: "User ID",
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
              {/* <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link> */}
  
              <Button
                onClick={() =>
                  deleteOrderHandler(params.id)
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      }

    ];

    const rows = [];

    adminBookings && adminBookings.forEach((booking, index) => {
      rows.push({
        id: booking._id,
        location: booking.location,
        package: booking.package,
        carid: booking.car,
        userid: booking.user
      });
    });


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(deleteClearError());
        }

        if (isDeleted) {
            alert.success("Booking Deleted Successfully");
            navigate("/admin/allbookings", {replace: true});
            dispatch({ type: DELETE_BOOKING_RESET });
          }

        const myForm = new FormData();
        myForm.set("userRole", user.role);

        dispatch(getAllAdminBookings(myForm));
    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

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
                <Typography id="booking-heading">All Bookings</Typography>
            </div>
            ) : (<p>You are not an admin</p>) }
    </div>
  )
}

export default AdminBookings