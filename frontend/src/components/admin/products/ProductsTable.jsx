import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { adminProductsTableColumns } from '../../helper/TableColumns';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import AddUpdateProductForm from './AddUpdateProductForm';

const ProductsTable = ({ products, pagination }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const rows = products?.map(product => {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      discount: product.discount,
      specialPrice: product.specialPrice,
    };
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  }

  const handleDelete = (product) => {

  }

  const handleImageUpload = (product) => {

  }

  const handleProductView = (product) => {

  }

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set('page', page.toString());
    navigate(`${pathname}?${params}`);
  }

  return (
    <div>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          columns={adminProductsTableColumns(handleEdit, handleDelete, handleImageUpload, handleProductView)}
          paginationMode='server'
          rowCount={pagination?.totalElements || 0}
          autosizeOptions={{ columns: ['action'], expand: true }}
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
        setOpen={setOpenUpdateModal}
        title='Update Product'>
        <AddUpdateProductForm
          setOpen={setOpenUpdateModal}
          product={selectedProduct}
          update={openUpdateModal}/>
      </Modal>
    </div>
  )
}

export default ProductsTable