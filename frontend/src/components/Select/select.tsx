import { forwardRef } from "react";

interface selectProps {
    label: string;
    category: string;
}

export const Select = forwardRef(({label, category, ...rest}: selectProps, ref:any) => {
  return (
    <div>
        <label className="block text-xl my-2">{label}</label>
        <select
         className="py-2 px-3 border border-solid border-black"
         {...rest} ref={ref}>
            <option value={category}>{category}</option>
        </select>
    </div>
  )
})
