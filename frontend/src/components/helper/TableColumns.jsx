import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";


export const adminProductsTableColumns = (
    handleEdit,
    handleDelete,
    handleImageUpload,
    handleProductView
) => [
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'id',
        headerName: 'Id',
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Product ID</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'name',
        headerName: 'Name',
        minWidth: 220,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Name</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'image',
        headerName: 'Image',
        minWidth: 200,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Image</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'description',
        headerName: 'Description',
        minWidth: 200,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Description</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'quantity',
        headerName: 'Quantity',
        minWidth: 100,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Quantity</span>
    },
    {
        sortable: true,
        disableColumnMenu: true,
        field: 'price',
        headerName: 'Price',
        minWidth: 100,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Price</span>
    },
    {
        sortable: true,
        disableColumnMenu: true,
        field: 'discount',
        headerName: 'Discount',
        minWidth: 100,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Discount</span>
    },
    {
        sortable: true,
        disableColumnMenu: true,
        field: 'specialPrice',
        headerName: 'Special Price',
        minWidth: 100,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Special Price</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'action',
        headerName: 'action',
        minWidth: 400,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold text-center',
        cellClassName: 'text-slate-700 font-normal',
        renderHeader: (params) => <span>Action</span>,
        renderCell: (params) => {
            return (
                <div className='flex justify-around items-center space-x-4 h-full ml-3'>
                    <button 
                    className='flex justify-center items-center bg-green-500 hover:bg-green-700 transition-colors duration-200 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleImageUpload(params.row)}>
                        <FaImage className='mr-2' />
                        Image
                    </button>
                    <button 
                    className='flex justify-center items-center bg-blue-500 hover:bg-blue-700 transition-colors duration-200 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleEdit(params.row)}>
                        <FaEdit className='mr-2' />
                        Edit
                    </button>
                    <button 
                    className='flex justify-center items-center bg-red-500 hover:bg-red-700 transition-colors duration-200 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleDelete(params.row)}>
                        <FaTrashAlt className='mr-2' />
                        Delete
                    </button>
                    <button 
                    className='flex justify-center items-center bg-slate-500 hover:bg-slate-700 transition-colors duration-200 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleProductView(params.row)}>
                        <FaEye className='mr-2' />
                        View
                    </button>
                </div>
            );
        }
    },
];

export const adminOrdersTableColumns = (handleEdit) => [
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
        flex: 0,
        minWidth: 250,
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
        flex: 0,
        minWidth: 200,
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
        flex: 0,
        minWidth: 200,
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
        flex: 0,
        minWidth: 200,
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
        flex: 1,
        minWidth: 250,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold text-center',
        cellClassName: 'text-slate-700 font-normal',
        renderHeader: (params) => <span>Action</span>,
        renderCell: (params) => {
            return (
                <div className='flex justify-around items-center space-x-4 h-full '>
                    <button 
                    className='flex justify-center items-center bg-blue-400 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleEdit(params.row)}>
                        <FaEdit className='mr-2' />
                        Edit
                    </button>
                </div>
            );
        }
    },
];

export const adminCategoryTableColumns = (
    handleEdit,
    handleDelete
) => [
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'id',
        headerName: 'Id',
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Category ID</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'name',
        headerName: 'Name',
        minWidth: 300,
        flex: 0,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold border',
        cellClassName: 'text-slate-700 font-normal border',
        renderHeader: (params) => <span>Name</span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: 'action',
        headerName: 'action',
        minWidth: 400,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerClassName: 'text-black font-semibold text-center',
        cellClassName: 'text-slate-700 font-normal',
        renderHeader: (params) => <span>Action</span>,
        renderCell: (params) => {
            return (
                <div className='flex justify-around items-center space-x-4 h-full ml-3'>
                    <button 
                    className='flex justify-center items-center bg-blue-500 hover:bg-blue-700 transition-colors duration-200 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleEdit(params.row)}>
                        <FaEdit className='mr-2' />
                        Edit
                    </button>
                    <button 
                    className='flex justify-center items-center bg-red-500 hover:bg-red-700 transition-colors duration-200 text-white px-4 h-9 rounded-md text-shadow-md cursor-pointer'
                    onClick={() => handleDelete(params.row)}>
                        <FaTrashAlt className='mr-2' />
                        Delete
                    </button>
                </div>
            );
        }
    },
];