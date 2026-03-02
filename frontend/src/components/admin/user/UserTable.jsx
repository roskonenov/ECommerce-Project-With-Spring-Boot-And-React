import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { adminUsersTableColumns } from '../../helper/TableColumns';
import { useDispatch } from 'react-redux';
import { addRoleToUser } from '../../../store/actions';

const UserTable = ({adminUsers, pagination}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const rows = adminUsers?.map(user => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.slice(5)).join(', '),
    };
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set('page', page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleAddRole = (user, roleParam) => {
    const param = new URLSearchParams();
    param.set('role', roleParam)
    dispatch(addRoleToUser(user.id, param.toString()));
  };

  return (
    <div>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          columns={adminUsersTableColumns(handleAddRole)}
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
      
    </div>
  )
}

export default UserTable