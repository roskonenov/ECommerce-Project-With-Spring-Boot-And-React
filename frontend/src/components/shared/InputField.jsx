import React from 'react'

const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    minLength,
    maxLength,
    min,
    max,
    step,
    placeholder,
    disabled
}) => {
    return (
        <div className='flex flex-col gap-1 w-full'>

            <label htmlFor={id}
                className={`${className ? className : ''} 
            font-semibold text-sm text-slate-800`}
            >
                {label}
            </label>

            <input
                type={type}
                id={id}
                placeholder={placeholder}
                disabled={disabled}
                {...(min !== undefined && { min: Number(min) })}
                {...(max !== undefined && { max: Number(max) })}
                {...(step !== undefined && { step: Number(step) })}
                className={`${className ? className : ''} p-2 border outline-none bg-transparent text-slate-800 rounded-md
                ${errors[id]?.message ? 'border-red-500' : 'border-slate-700'}`}
                {...register(id, {
                    required: { value: required, message },
                    minLength: minLength
                        ? { value: minLength, message: `* Minimum ${minLength} characters is required!` }
                        : null,
                    maxLength: maxLength
                        ? { value: maxLength, message: `* Maximum of ${maxLength} characters length exceeded!` }
                        : null,
                    pattern:
                        type === 'email'
                            ? {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email!'
                            }
                            : type === 'url'
                                ? {
                                    value: /^https?:\/\/([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                                    message: 'Please enter a valid url!'
                                }
                                : null
                })}
            />

            {errors[id]?.message && (
                <p className='text-sm font-semibold text-red-600 mt-0'>
                    {errors[id]?.message}
                </p>
            )}

        </div>
    )
}

export default InputField;