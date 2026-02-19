import React from 'react'

const SelectField = ({
    id,
    label,
    select,
    setSelect,
    list,
    errors,
    register,
    required,
    message,
    className,
    disabled,
    placeholder,
}) => {
    return (
        <div className='flex flex-col gap-1 w-full'>

            <label htmlFor={id}
                className={`${className ? className : ''} 
            font-semibold text-sm text-slate-800`}
            >
                {label}
            </label>

            <select
                id={id}
                onChange={setSelect}
                disabled={disabled}
                className={`${className ? className : ''} p-2 border outline-none bg-transparent text-slate-800 rounded-md
                ${errors[id]?.message ? 'border-red-500' : 'border-slate-700'}`}
                {...register(id, {required: { value: required, message }})}
                defaultValue={select || ''}
            >
                <option value={''}>{placeholder}</option>
                {list?.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>

            {errors[id]?.message && (
                <p className='text-sm font-semibold text-red-600 mt-0'>
                    {errors[id]?.message}
                </p>
            )}

        </div>
    )
}

export default SelectField;