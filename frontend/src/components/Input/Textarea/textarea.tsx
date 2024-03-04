import { forwardRef } from "react";


interface TextareaProps {
    id: string;
    label: string;
    placeholder: string;
}

export const TextArea = forwardRef(({id, label, placeholder, ...rest}: TextareaProps, ref: any) => {
  return (
    <div>
        <label className="block text-xl my-2" htmlFor={id}>{label}</label>
        <textarea
            className="py-2 px-3 border border-solid border-black w-[90%]"
            rows={15}
            placeholder={placeholder}
            {...rest}
            ref={ref} />
    </div>
  )
})
