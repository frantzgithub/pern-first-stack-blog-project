import { useEffect, useState } from "react";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "../../../redux/api/categoryBuilder";
import { CategoryCard } from "../../../components/Category/categoryCard";
import { Input } from "../../../components/Input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";

type categoryProps = {
  id: string;
  category_name: string;
};

export interface categoryInput {
    category: string,
}

export const CrudCategory = () => {
  const [writeNewCategory, setWriteNewCategory] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm<categoryInput>();

  const { data: categories, refetch } = useGetCategoriesQuery({});
  console.log(categories);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [createCategory] = useCreateCategoryMutation();

  const handleSubmitCategory: SubmitHandler<categoryInput> = async (data) => {
    console.log(data);
    const res = await createCategory({category_name: data.category}).unwrap();
    console.log(res)
    setWriteNewCategory(false)
    refetch()
  };
  return (
    <section>
      <h1 className="_title text-center">Category</h1>
      <div className="mt-5">
        {!writeNewCategory ? (
          <div>
            {categories &&
              categories.map((category: categoryProps) => {
                return (
                  <CategoryCard key={category.id} allCategories={category} />
                );
              })}
            <button
              onClick={() => setWriteNewCategory((prev) => !prev)}
              className="_button m-5"
            >
              add category
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <button className="bg-white text-red-700 p-3 rounded-full" onClick={() => setWriteNewCategory((prev) => !prev)}>
            <FaArrowLeft />
            </button>
            <form onSubmit={handleSubmit(handleSubmitCategory)}>
              <Input
                label="New category"
                type="text"
                placeholder="add new category"
                {...register("category")}
              />
               <button type="submit" className="_button m-5">add category</button>
            </form>

           
          </div>
        )}
      </div>
    </section>
  );
};
