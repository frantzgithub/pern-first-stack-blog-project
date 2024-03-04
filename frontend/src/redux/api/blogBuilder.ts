import { apiSlice } from "./createSlice";
import { blogEndpoints } from "../constant/constant";

// interface BodyData {
//     title: string;
//     desc: string;
//     image: string | FormData;
//     category: string;
// }

export const blogBuilder= apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        newPost: builder.mutation({
            query: (body: any) => {
                return {
                    url: `${blogEndpoints}/`,
                    method: "POST",
                    body,
                }
            }
        }),
        getAllPosts: builder.query({
            query: () => ({
                url: `${blogEndpoints}/`,
            })
        }),
        getPostId: builder.query({
            query: (id: string | undefined) => ({
                url: `${blogEndpoints}/${id}`,
            })
        })
    })
})

export const { 
    useNewPostMutation,
    useGetAllPostsQuery,
    useGetPostIdQuery,
} = blogBuilder;