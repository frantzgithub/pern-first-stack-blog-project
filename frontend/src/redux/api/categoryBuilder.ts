import { apiSlice } from "./createSlice";
import { categoryEndpoints } from "../constant/constant";
//import { Categories } from "../../views/Form/form";

//type categoriesResponse = Categories[];

export const categoryBuilder = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: `${categoryEndpoints}/`
            })
        }),
        createCategory: builder.mutation({
            query: (body: {category_name: string}) => ({
                url: `${categoryEndpoints}/`,
                method: "POST",
                body,
            })
        }),
        deleteCategory: builder.mutation({
            query: (id: string | undefined) => ({
                url: `${categoryEndpoints}/${id}`,
                method: "DELETE",
            })
        }),
        updateCategory: builder.mutation({
            query: (data: {id: string | undefined, category_name: string}) => ({
                url: `${categoryEndpoints}/${data.id}`,
                method: "PUT",
                body: data,
            })
        })
    })
})

export const { 
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
     } = categoryBuilder;