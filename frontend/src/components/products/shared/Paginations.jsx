import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom';

const Paginations = ({
  pageNumber,
  pageSize,
  totalElements,
  totalPages,
  lastPage
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const handlePageChange = (e, value) => {
    setSearchParams(s => {
      const params = new URLSearchParams(s);
      params.set('page', value.toString());
      return params;
    });
  };

  return (
    <div className='flex justify-center mt-10'>
      <Pagination
        count={totalPages}
        defaultPage={1}
        page={currentPage}
        variant="outlined"
        color="primary"
        onChange={handlePageChange} />
    </div>
  )
}

export default Paginations;