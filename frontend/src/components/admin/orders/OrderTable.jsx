import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { FaEdit } from 'react-icons/fa';

const OrderTable = () => {
    
      const columns = [
      { 
        sortable: false,
        disableColumnMenu: true,
        field: 'id',
        headerName: 'OrderId',
        minWidth: 130,
        headerAlign: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Order ID</span>
       },
      { 
        sortable: false,
        disableColumnMenu: true,
        field: 'email',
        headerName: 'Email',
        width: 250,
        headerAlign: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Email</span>
       },
      { 
        sortable: true,
        disableColumnMenu: true,
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 200,
        headerAlign: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Total Amount</span>
       },
      { 
        sortable: false,
        disableColumnMenu: true,
        field: 'status',
        headerName: 'Status',
        width: 200,
        headerAlign: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Status</span>
       },
      { 
        sortable: false,
        disableColumnMenu: true,
        field: 'date',
        headerName: 'orderDate',
        width: 200,
        headerAlign: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Order Date</span>
       },
       { 
        sortable: false,
        disableColumnMenu: true,
        field: 'action',
        headerName: 'action',
        width: 250,
        headerAlign: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold text-center',
        cellClassName: 'text-slate-700 font-normal',
        renderHeader: (params) => <span>Action</span>,
        renderCell: (params) => {
            return (
                <div className='flex justify-center items-center space-x-4 h-full '>
                    <button className='flex justify-center items-center bg-blue-400 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'>
                        <FaEdit className='mr-2'/>
                        Edit
                    </button>
                </div>
            );
        }
       },
    ];
    
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    
  return (
    <div>
        <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
    </div>
  )
}

export default OrderTable;