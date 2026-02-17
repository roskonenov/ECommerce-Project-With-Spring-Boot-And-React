import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { adminProductsTableColumns } from '../../helper/TableColumns';

const ProductsTable = ({ products, pagination }) => {
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

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

  }

  const handleDelete = (product) => {

  }

  const handleImageUpload = (product) => {

  }

  const handleProductView = (product) => {

  }

  const handlePaginationChange = (paginationModel) => {

  }

  return (
    <div>
      <DataGrid
        className='w-full'
        rows={rows}
        columns={adminProductsTableColumns(handleEdit, handleDelete, handleImageUpload, handleProductView)}
        paginationMode='server'
        rowCount={pagination?.totalElements || 0}
        autosizeOptions={{columns:['action'], expand: true}}
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

export default ProductsTable