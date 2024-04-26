import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import ErrorLog from './errorLog';
import { useDispatch } from 'react-redux';
import { getAllUserBookings } from '../actions/userActions';
import GoBackButton from './goBackButton';
import MetaData from './layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import "../stylesheets/myBookings.css";

const MyBookings = () => {

  const {loading, error, myBookings} = useSelector(state => state.myBookings);
  const { isAuthenticated, user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const userid = user._id;

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
      }

    ];

    const rows = [];

    myBookings && myBookings.forEach((booking, index) => {
      rows.push({
        id: booking._id,
        location: booking.location,
        package: booking.package,
        carid: booking.car,
      });
    });

    useEffect(() => {

      const myForm = new FormData();
      myForm.set("userid", userid);

      dispatch(getAllUserBookings(myForm));
    }, [dispatch]);

  return (
    <div>
        {isAuthenticated ? (
            <div className='bookings-page'>
                <MetaData title="My Bookings"></MetaData>
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
                <Typography id="booking-heading">{user.name}'s Bookings</Typography>
            </div>
        ) : <ErrorLog />}

    </div>
  )
}

export default MyBookings