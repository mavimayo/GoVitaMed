import type { UseQueryOptions } from '@tanstack/react-query';
import { useFetch } from '@/hooks/use-fetch';
import { useQueryClient } from '@tanstack/react-query';

// === TYPES === //

export type StaticQuery<TData> = {
  queryKey: readonly unknown[];
  path: string;
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;
  _data?: TData;
};

export type DynamicQuery<TArgs extends any[], TData> = {
  queryKey: (...args: TArgs) => readonly unknown[];
  path: (...args: TArgs) => string;
  options?: (...args: TArgs) => Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;
  _data?: TData;
};

export type QueryDefinition<TArgs extends any[] = [], TData = unknown> =
  TArgs extends [] ? StaticQuery<TData> : DynamicQuery<TArgs, TData>;

export type InferQueryData<T> = T extends { _data?: infer D } ? D : never;

export type InferQueryKey<T> = T extends { queryKey: infer K }
  ? K extends (...args: infer A) => readonly unknown[]
    ? (...args: A) => readonly unknown[]
    : () => K
  : never;

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

// === HELPERS === //

export const defineQuery = <TArgs extends any[] = [], TData = unknown>(
  def: QueryDefinition<TArgs, TData>,
): QueryDefinition<TArgs, TData> => def;

// === createTypedFetchHook === //

export function createTypedFetchHook<
  T extends Record<string, QueryDefinition<any, any>>[],
>(...keySets: T) {
  type MergedType = UnionToIntersection<T[number]>;
  const merged = Object.assign({}, ...keySets) as MergedType;

  return function useTypedFetch<K extends keyof MergedType & string>(
    key: K,
    ...args: Parameters<InferQueryKey<MergedType[K]>>
  ): {
      data: InferQueryData<MergedType[K]> | undefined;
    } {
    const def = merged[key] as QueryDefinition<any, any>;

    const queryKey
      = typeof def.queryKey === 'function' ? def.queryKey(...args) : def.queryKey;

    const path
      = typeof def.path === 'function' ? def.path(...args) : def.path;

    const options
      = typeof def.options === 'function' ? def.options(...args) : def.options;

    const query = useFetch<InferQueryData<typeof def>>({
      queryKey: [...queryKey as string[]],
      path,
      ...options,
    });

    return query;
  };
}

// === createTypedInvalidationHook === //

export function createTypedInvalidationHook<
  T extends Record<string, QueryDefinition<any, any>>[],
>(...keySets: T) {
  type MergedType = UnionToIntersection<T[number]>;
  const merged = Object.assign({}, ...keySets) as MergedType;

  return function useTypedInvalidation() {
    const queryClient = useQueryClient();

    const invalidateQuery = <K extends keyof MergedType & string>(
      key: K,
      ...args: Parameters<InferQueryKey<MergedType[K]>>
    ) => {
      const def = merged[key] as QueryDefinition<any, any>;

      const queryKey
        = typeof def.queryKey === 'function' ? def.queryKey(...args) : def.queryKey;

      return queryClient.invalidateQueries({ queryKey });
    };

    return { invalidateQuery };
  };
}

// === extractQueryKeys === //

export function extractQueryKeys<
  T extends Record<string, QueryDefinition<any, any>>[],
>(...keySets: T) {
  type MergedType = UnionToIntersection<T[number]>;
  const merged = Object.assign({}, ...keySets) as Record<string, QueryDefinition<any, any>>;

  const result: Record<string, any> = {};

  for (const key in merged) {
    const def = merged[key];
    result[key]
      = typeof def.queryKey === 'function'
        ? (...args: any[]) => typeof def.queryKey === 'function' ? def.queryKey(...args) : def.queryKey
        : def.queryKey;
  }

  return result as {
    [K in keyof MergedType]: MergedType[K] extends DynamicQuery<infer Args, any>
      ? (...args: Args) => ReturnType<MergedType[K]['queryKey']>
      : MergedType[K] extends StaticQuery<any>
        ? MergedType[K]['queryKey']
        : never;
  };
}
