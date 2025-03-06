"use client";
import { env } from "@/env";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
export type FetchApiType = {
  queryKey: string;
  path: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IUseFetch<T> {
  path: string;
  queryKey: string[]; //key for identification
  config?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;
}

export function useFetch<T>({ path, queryKey, config }: IUseFetch<T>) {
  const auth = { token: "" };
  if (!queryKey) throw new Error("queryKey is required");
  if (!path) throw new Error("path is required");
  const REQUEST_URL = env.NEXT_PUBLIC_APP_URL + path;
  console.log(auth?.token);
  const fetchData = async (): Promise<T> => {
    try {
      const response = await axios.get(REQUEST_URL, {
        headers: auth?.token
          ? {
              Authorization: `Bearer ${auth?.token}`,
            }
          : {},
      });

      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error.response) {
        throw new Error(
          "Network error, please check your internet connection."
        );
      }
      if (error.response.status === 401) {
        console.log("Unauthorized access, logging out...");
        // Add your function here
      }
      throw error;
    }
  };

  const query = useQuery<T, Error>({
    queryKey,
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    staleTime: config?.staleTime ?? 60 * 5,
    ...config,
  });

  return query;
}
