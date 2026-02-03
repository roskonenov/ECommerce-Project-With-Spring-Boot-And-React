import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react'
import { adminOrdersTableColumns } from '../../helper/TableColumns';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const OrderTable = ({ adminOrders, pagination }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const rows = adminOrders?.map(order => {
    return {
      id: order.id,
      email: order.email,
      totalAmount: order.totalAmount,
      status: order.status,
      date: order.orderDate,
    };
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    console.log(page);
    
    setCurrentPage(page);
    params.set('page', page.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <div>
      <DataGrid
      className='w-full'
        rows={rows}
        columns={adminOrdersTableColumns}
        paginationMode='server'
        rowCount={pagination?.totalElements || 0}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pagination?.pageSize || 20,
              page: currentPage - 1
            },
          },
        }}
        onPaginationModelChange={handlePaginationChange}
        disableColumnResize
        pageSizeOptions={[pagination?.pageSize || 20]}
        disableRowSelectionOnClick
        pagination
        paginationOptions={{
          showFirstButton: true,
          showLastButton: true,
          hideNextButton: pagination?.lastPage
        }}
      />
    </div>
  )
}

export default OrderTable;