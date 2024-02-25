import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../constant/constant";

export const apiSlice = createApi({
    reducerPath: "authentticate",
    baseQuery: fetchBaseQuery({baseUrl: BaseUrl}),
    tagTypes: ['User'],
    endpoints: () => ({})
})

