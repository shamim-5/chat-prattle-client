import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());

      localStorage.clear();
    }

    return result;
  },
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({}),
});
