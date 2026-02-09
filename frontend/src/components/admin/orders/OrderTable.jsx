import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react'
import { adminOrdersTableColumns } from '../../helper/TableColumns';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({ adminOrders, pagination }) => {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [openUpdateModal, setOpenUpdateModeal] = useState(false);
  const [loader, setLoader] = useState(false);
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
    setCurrentPage(page);
    params.set('page', page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setOpenUpdateModeal(true)
  };

  return (
    <div>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          columns={adminOrdersTableColumns(handleEdit)}
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
      <Modal
        open={openUpdateModal}
        setOpen={setOpenUpdateModeal}
        title='Update Order Status'>
        <UpdateOrderForm
          setOpen={setOpenUpdateModeal}
          selectedItem={selectedOrder}
          loader={loader}
          setLoader={setLoader} />
      </Modal>
    </div>
  )
}

export default OrderTable;