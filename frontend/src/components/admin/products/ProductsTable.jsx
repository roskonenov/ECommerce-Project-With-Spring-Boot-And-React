import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { adminProductsTableColumns } from '../../helper/TableColumns';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import AddUpdateProductForm from './AddUpdateProductForm';
import DeleteModal from '../../shared/DeleteModal';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../store/actions';
import toast from 'react-hot-toast';
import ImageUploadForm from './ImageUploadForm';
import ProductViewModal from '../../shared/ProductViewModal';

const ProductsTable = ({ products, pagination, openAddModal, setOpenAddModal, modalMode, setModalMode }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const isAvailable = selectedProduct.quantity && Number(selectedProduct.quantity) > 0;

  const dispatch = useDispatch();
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
    setModalMode('edit');
    console.log('Modal mode set to edit');
    
  }

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  }

  const handleImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageUploadModal(true);
  }

  const handleProductView = (product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  }

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set('page', page.toString());
    navigate(`${pathname}?${params}`);
  }

  const handleProductDelete = () => {
    dispatch(deleteProduct(selectedProduct.id, toast, setLoader, setOpenDeleteModal));
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
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={modalMode === 'edit' ? 'Update Product' : 'Add Product'}>
        <AddUpdateProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          product={selectedProduct}
          update={openUpdateModal}
          modalMode={modalMode} />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title={'Upload Product Image'}>
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title='Delete Product'
        deleteHandler={handleProductDelete}
        loader={loader}
      />

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedProduct}
        isAvailable={isAvailable} />

    </div>
  )
}

export default ProductsTable