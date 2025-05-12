import { defineQuery } from "@/lib/query/query.utils";

export const SAMPLE_KEYS = {
    first:defineQuery<[],{string:string}>({
        queryKey: ["sample", "first"],
        path: "/sample/first",
    })
}
