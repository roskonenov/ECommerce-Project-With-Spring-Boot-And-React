import React from 'react'

const Spinner = () => {
    return (
        <div className="mx-auto my-50 w-15 aspect-square grid animate-[spin_4s_infinite]
        before:content-[''] before:col-start-1 before:row-start-1 before:border-8 
        before:rounded-full before:border-t-red-700 before:border-l-red-700 
        before:border-b-transparent before:border-r-transparent
        before:mix-blend-darken before:animate-[spin_2s_infinite_linear]
        after:content-[''] after:col-start-1 after:row-start-1 after:border-8 
        after:rounded-full after:border-t-transparent after:border-l-transparent 
        after:border-b-blue-600 after:border-r-blue-600 after:mix-blend-darken 
        after:animate-[spin_1s_infinite_linear_reverse]"></div>)
}

export default Spinner