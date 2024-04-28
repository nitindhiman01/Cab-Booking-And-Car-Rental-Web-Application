import React from 'react';
import { useSelector } from 'react-redux';
import GoBackButton from './goBackButton';
import MetaData from './layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import "../stylesheets/myBookings.css";

const AdminCars = () => {

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const {rentCars} = useSelector(state => state.rentCars);

    const columns = [
        {field: "id", headerName: "Car ID", minWidth: 250, flex: 1},
  
        {
          field: "name",
          headerName: "Name",
          minWidth: 120,
          flex: 0.5,
        },
        {
            field: "model",
            headerName: "Model",
            minWidth: 120,
            flex: 0.5,
        },
        {
          field: "plate_no",
          headerName: "Plate No.",
          minWidth: 120,
          flex: 0.5,
        },
        {
          field: "transmission",
          headerName: "Transmission",
          minWidth: 200,
          flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "fuelType",
            headerName: "Fuel Type",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "occupancy",
            headerName: "Occupancy",
            minWidth: 100,
            flex: 1,
        },
    ];
  
      const rows = [];
  
      rentCars && rentCars.forEach((car, index) => {
        rows.push({
          id: car._id,
          name: car.name,
          model: car.model,
          plate_no: car.plate_number,
          transmission: car.transmission,
          category: car.category,
          price: car.price,
          fuelType: car.fueltype,
          occupancy: car.occupancy,
        });
      });

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
                <Typography id="booking-heading">All Cars</Typography>
            </div>
            ) : (<p>You are not an admin</p>) }
    </div>
  )
}

export default AdminCars