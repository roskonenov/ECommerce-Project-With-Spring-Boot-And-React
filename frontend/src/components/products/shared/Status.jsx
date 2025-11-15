import React from 'react'

const Status = ({
    text,
    icon: Icon,
    bg,
    color
}) => {
  return (
    <div
    className={`${bg} ${color} p-2 font-medium rounded flex items-center gap-1 max-h-fit`}>
        {text} <Icon size={20}/>
    </div>
  )
} 

export default Status