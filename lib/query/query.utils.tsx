import type { UseQueryOptions } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useFetch } from '@/hooks/use-fetch';

// Base type for search parameters
export type SearchParams = Record<string, string | number | boolean | undefined | null>;

// Static query type with proper generics
export type StaticQuery<
  TData = unknown,
  TParams = undefined,
  TSearchParams = SearchParams,
> = {
  queryKey: readonly unknown[];
  path: string;
  requiresParams?: boolean;
  searchParams?: TSearchParams;
  _data?: TData;
  _params?: TParams;
  _searchParams?: TSearchParams;
};

// Dynamic query type with proper generics
export type DynamicQuery<
  TData = unknown,
  TParams = undefined,
  TSearchParams = SearchParams,
> = {
  queryKey: (params: TParams, searchParams?: TSearchParams) => readonly unknown[];
  path: (params: TParams, searchParams?: TSearchParams) => string;
  requiresParams?: boolean;
  searchParams?: TSearchParams | ((params: TParams) => TSearchParams);
  _data?: TData;
  _params?: TParams;
  _searchParams?: TSearchParams;
};

// Query definition type combining static and dynamic
export type QueryDefinition<
  TData = unknown,
  TParams = undefined,
  TSearchParams = SearchParams,
> = StaticQuery<TData, TParams, TSearchParams> | DynamicQuery<TData, TParams, TSearchParams>;

// Utility types for type inference
export type InferQueryData<T> = T extends { _data?: infer D } ? D : never;
export type InferQueryParams<T> = T extends { _params?: infer P } ? P : undefined;
export type InferSearchParams<T> = T extends { _searchParams?: infer S } ? S : SearchParams;

// Helper type for merging unions
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// Define query function with proper typings
export const defineQuery = <
  TData = unknown,
  TParams = undefined,
  TSearchParams = SearchParams,
>(
  def: QueryDefinition<TData, TParams, TSearchParams>,
): QueryDefinition<TData, TParams, TSearchParams> => def;

// Helper function to build URL with search params
function buildUrlWithParams(baseUrl: string, searchParams?: SearchParams): string {
  if (!searchParams) {
    return baseUrl;
  }
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params.toString() ? `${baseUrl}?${params}` : baseUrl;
}

// Create typed fetch hook with proper generic constraints
export function createTypedFetchHook<
  T extends Record<string, QueryDefinition<any, any, any>>[],
>(...keySets: T) {
  type Merged = UnionToIntersection<T[number]>;
  const merged = Object.assign({}, ...keySets) as Merged;

  // Config interface for useTypedFetch
  type UseTypedFetchConfig<K extends keyof Merged & string> = {
    params?: InferQueryParams<Merged[K]>;
    searchParams?: InferSearchParams<Merged[K]>;
    options?: Partial<UseQueryOptions<InferQueryData<Merged[K]>, Error>>;
  };

  // Return a strongly typed hook function
  return function useTypedFetch<K extends keyof Merged & string>(
    key: K,
    config?: UseTypedFetchConfig<K>,
  ) {
    // Get the response type from the query definition
    type ResponseType = InferQueryData<Merged[K]>;

    const def = merged[key] as QueryDefinition<ResponseType, any, any>;
    const params = config?.params;
    const searchParams = config?.searchParams;
    const options = config?.options;

    if (def.requiresParams && !params) {
      console.error(`Query "${String(key)}" requires params but none were provided`);
    }

    // Determine queryKey based on static or dynamic definition
    let queryKey: readonly unknown[];
    if (typeof def.queryKey === 'function') {
      // Dynamic queryKey
      queryKey = def.queryKey(params, searchParams);
    } else {
      // Static queryKey with params and searchParams added for cache differentiation
      const baseKey = [...def.queryKey];

      // Include params in the query key if provided
      if (params) {
        baseKey.push(params);
      }

      // Include search params keys in the query key if provided
      if (searchParams && Object.keys(searchParams).length > 0) {
        baseKey.push(Object.keys(searchParams).sort().join(','));
        // Include search param values for cache differentiation
        baseKey.push(Object.values(searchParams)
          .filter(v => v !== undefined && v !== null)
          .map(String)
          .sort()
          .join(','));
      }

      queryKey = baseKey;
    }

    // Determine basePath based on static or dynamic definition
    let basePath: string;
    if (typeof def.path === 'function') {
      // Dynamic path
      basePath = def.path(params, searchParams);
    } else {
      // Static path with params appended if needed
      basePath = def.path;

      // Append params to path if provided
      if (params) {
        // Get all keys of the params
        const paramKeys = Object.keys(params);
        if (paramKeys.length > 0) {
          // For each param, check if it's in the path template and replace it
          // Otherwise just append the first param value to the path
          let pathModified = false;

          for (const key of paramKeys) {
            const placeholder = `:${key}`;
            if (basePath.includes(placeholder)) {
              basePath = basePath.replace(placeholder, String((params as Record<string, any>)[key]));
              pathModified = true;
            }
          }

          // If path wasn't modified by replacements, append the first param value
          if (!pathModified && paramKeys.length > 0) {
            const firstKey = paramKeys[0];
            const firstValue = (params as Record<string, any>)[firstKey];
            if (firstValue !== undefined && firstValue !== null) {
              // Add the value to the path
              basePath = basePath.endsWith('/')
                ? `${basePath}${String(firstValue)}`
                : `${basePath}/${String(firstValue)}`;
            }
          }
        }
      }
    }

    // Add search parameters to URL
    const path = buildUrlWithParams(basePath, searchParams as SearchParams | undefined);

    // Return with explicit type annotation
    return useFetch<ResponseType>({
      queryKey,
      path,
      ...options,
    });
  };
}

// Create typed invalidation hook
export function createTypedInvalidationHook<
  T extends Record<string, QueryDefinition<any, any, any>>[],
>(...keySets: T) {
  type Merged = UnionToIntersection<T[number]>;
  const merged = Object.assign({}, ...keySets) as Merged;

  return function useTypedInvalidation() {
    const queryClient = useQueryClient();

    const invalidateQuery = <K extends keyof Merged & string>(
      key: K,
      params?: InferQueryParams<Merged[K]>,
      searchParams?: InferSearchParams<Merged[K]>,
    ) => {
      const def = merged[key] as QueryDefinition<any, any, any>;
      const queryKey = typeof def.queryKey === 'function'
        ? def.queryKey(params as any, searchParams)
        : def.queryKey;
      return queryClient.invalidateQueries({ queryKey });
    };

    return { invalidateQuery };
  };
}

// Extract query keys for reuse
export function extractQueryKeys<
  T extends Record<string, QueryDefinition<any, any, any>>[],
>(...keySets: T) {
  type Merged = UnionToIntersection<T[number]>;
  const merged = Object.assign({}, ...keySets) as Merged;

  const result: Record<string, any> = {};

  for (const key in merged) {
    const def = merged[key] as QueryDefinition<any, any, any>;
    result[key] = typeof def.queryKey === 'function'
      // eslint-disable-next-line ts/no-unsafe-function-type
      ? (params: any, searchParams?: any) => (def.queryKey as Function)(params, searchParams)
      : def.queryKey;
  }

  return result as {
    [K in keyof Merged]: Merged[K] extends DynamicQuery<any, infer P, infer S>
      ? (params: P, searchParams?: S) => readonly unknown[]
      : readonly unknown[];
  };
}
