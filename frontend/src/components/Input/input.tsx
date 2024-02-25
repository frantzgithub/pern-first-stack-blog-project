import { forwardRef } from "react"


type inputProps = {
    id?: string,
    label: string,
    type: string,
    placeholder: string,
}

export const Input = forwardRef(({id, label, type, placeholder, ...rest}: inputProps, ref: any) => {
  return (
    <div>
        <label className="block text-xl my-2" htmlFor={id}>{label}</label>
        <input className="py-2 px-3 border border-solid border-black" type={type} id={id} placeholder={placeholder} {...rest} ref={ref} />
    </div>
  )
})
