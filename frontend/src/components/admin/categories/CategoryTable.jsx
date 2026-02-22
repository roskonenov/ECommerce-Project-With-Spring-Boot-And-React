import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import DeleteModal from '../../shared/DeleteModal';
import { useDispatch } from 'react-redux';
import {adminCategoryTableColumns} from '../../helper/TableColumns'
import AddUpdateCategoryForm from './AddUpdateCategoryForm';

const CategoryTable = ({ categories, pagination, openAddModal, setOpenAddModal, modalMode, setModalMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );
  

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const rows = categories?.map(category => {
    return {
      id: category.id,
      name: category.name,
    };
  });

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
    setModalMode('edit');
  }

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  }

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set('page', page.toString());
    navigate(`${pathname}?${params}`);
  }

  const handleCategoryDelete = () => {
    dispatch();
  }

  return (
    <div>
      <div>
        <DataGrid
          className='w-210 mx-auto'
          rows={rows}
          columns={adminCategoryTableColumns(handleEdit, handleDelete)}
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
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={modalMode === 'edit' ? 'Update Category' : 'Add Category'}>
        <AddUpdateCategoryForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          category={selectedCategory}
          update={openUpdateModal} 
          modalMode={modalMode}
          />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title='Delete Category'
        deleteHandler={handleCategoryDelete}
        loader={loader}
      />

    </div>
  )
}

export default CategoryTable;