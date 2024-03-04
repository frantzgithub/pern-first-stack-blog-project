import { useState } from "react";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../redux/api/categoryBuilder";
import { Input } from "../Input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { categoryInput } from "../../views/Writer/category/crudCategory";
import { toast } from "react-toastify";

type allCategoryProps = {
    allCategories: {
        id?: string;
        category_name: string;
    }
}

export const CategoryCard = ({allCategories}: allCategoryProps) => {
    const [isUpdatable, setIsUpdatable] = useState<boolean>(false)

    const {register, handleSubmit} = useForm<categoryInput>({defaultValues: {
        category: allCategories.category_name,
    }})

    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();


    const handleDelete = async (id: string | undefined) => {
        await deleteCategory(id).unwrap();
    }

    const handleSubmitUpdateCategory: SubmitHandler<categoryInput> = async (data) => {
        const res = await updateCategory({id: allCategories.id, category_name: data.category}).unwrap();
        console.log(res)
        toast.success(res.msg)
        setIsUpdatable(false)
    }
    
  return (
    <div>
        <ul>
            <li className="flex justify-center items-center gap-3 mb-3 ">
                {!isUpdatable ? (<>
                <p className="text-2xl capitalize">{allCategories.category_name}</p>
                <button onClick={() => setIsUpdatable((prev) => !prev)} className="_update_button">update</button>
                <button onClick={() => handleDelete(allCategories.id)} className="_delete_button">delete</button>
                </>
                ) : <form onSubmit={handleSubmit(handleSubmitUpdateCategory)}>
                    <Input
                        label=""
                        type="text"
                        placeholder=""
                        {...register("category")} 
                        />
                        <button className="_update_button mt-2" type="submit">save</button>
                </form>
                }
                
            </li>
        </ul>
    
    </div>
  )
}
