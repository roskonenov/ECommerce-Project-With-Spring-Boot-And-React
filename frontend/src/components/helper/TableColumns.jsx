import { FaEdit } from "react-icons/fa";

export const adminOrdersTableColumns = [
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'id',
        headerName: 'OrderId',
        minWidth: 130,
        headerAlign: 'center',
        align: 'center',
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
        align: 'center',
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
        align: 'center',
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
        align: 'center',
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
        align: 'center',
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
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold text-center',
        cellClassName: 'text-slate-700 font-normal',
        renderHeader: (params) => <span>Action</span>,
        renderCell: (params) => {
            return (
                <div className='flex justify-center items-center space-x-4 h-full '>
                    <button className='flex justify-center items-center bg-blue-400 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'>
                        <FaEdit className='mr-2' />
                        Edit
                    </button>
                </div>
            );
        }
    },
];