import { createTypedFetchHook, createTypedInvalidationHook } from "@/lib/query/query.utils";
import { SAMPLE_KEYS } from "@/lib/query/sampe.keys";

const QUERY_KEYS = {
    ...SAMPLE_KEYS,
};

export const useTypedFetch = createTypedFetchHook(QUERY_KEYS);
export const useTypedInvalidation = createTypedInvalidationHook(QUERY_KEYS);

export { QUERY_KEYS };
