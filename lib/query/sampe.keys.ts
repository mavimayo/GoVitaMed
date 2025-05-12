import { defineQuery } from "@/lib/query/query.utils";
import { Post } from "@/types";
interface FirstResponseType {
  haseeb: string;
}

export const SAMPLE_KEYS = {
    first:defineQuery<{haseeb:string}[],{string:string},{searchParams:string}>({
        queryKey: ["first"],
        path: "/api/first",
        requiresParams: true,
     _data: [] as FirstResponseType[] // This helps with type inference


    }),
    all:defineQuery<{},{id:number}>({
        queryKey: ["all"],
        path:"posts",
        requiresParams:true,
        _data: [] as Post[] // This helps with type inference
    })
}
