import { apiSlice } from "./createSlice";
import { userEndpoints } from "../constant/constant";

type DataUser = {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isWriter: boolean;
}

export const userBuilder = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: `${userEndpoints}/login`,
          method: "POST",
          body,
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `${userEndpoints}/logout`,
          method: "POST",
        };
      },
    }),
    register: builder.mutation({
      query: (body: { username: string; email: string; password: string }) => {
        return {
          url: `${userEndpoints}/`,
          method: "POST",
          body,
        };
      },
    }),
    updateUser: builder.mutation({
      query: (body: { id: string; username: string; email: string }) => {
        return {
          url: `${userEndpoints}/profile`,
          method: "PUT",
          body,
        };
      },
    }),
    getUserId: builder.query({
      query: (id: any) => ({
          url: `${userEndpoints}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUsers: builder.query({
        query: () => ({
            url: `${userEndpoints}/`,
        })
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `${userEndpoints}/${id}`,
        method: "DELETE",
      })
    }),
    updateUserById: builder.mutation({
      query: (data: DataUser) => {
        return {
          url: `${userEndpoints}/${data.id}`,
          method: "PUT",
          body: data,
        }
      }
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserIdQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserByIdMutation,
} = userBuilder;
