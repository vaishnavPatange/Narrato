import React, {forwardRef, useId} from 'react'

function Input({
    label,
    type="text",
    placeholder,
    className="",
    ...props

}, ref) {
    const id = useId();
  return (
    <div className='w-full'>
        { label && <label className='inline-block mb-1 pl-1'>
            {label}
        </label>}

        <input 
            type={type}
            placeholder={placeholder}
            className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            ref={ref}
            {...props}
            id={id}
        />
    </div>
  )
}

export default forwardRef(Input)
