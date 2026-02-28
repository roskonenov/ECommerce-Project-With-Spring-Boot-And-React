import React from 'react'
import useUsersFilter from '../../../hooks/useUsersFilter';
import { useSelector } from 'react-redux';

const User = () => {
  const {users, pagination} = useSelector(state => state.admin);
  useUsersFilter();
  console.log(users, pagination);
  
  return (
    <div>User</div>
  )
}

export default User;