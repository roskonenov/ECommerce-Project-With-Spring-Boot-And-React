import { Skeleton } from '@mui/material'
import React from 'react'

const AddressSceleton = () => {
  return (
    <div>
        <Skeleton width={180}/>
        <Skeleton width={250} />
        <Skeleton width={150} />
        <Skeleton />
        <Skeleton width={200} />
        <br />
        <Skeleton width={180}/>
        <Skeleton width={250} />
        <Skeleton width={150} />
        <Skeleton />
        <Skeleton width={200} />
    </div>
  )
}

export default AddressSceleton