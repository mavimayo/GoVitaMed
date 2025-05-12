 Next.js Template Documentation

# This a Next.js template

## Color Palette Generation for shadcn

You can visit [this](https://oxidus.vercel.app/) . It will generate the color palette for you. You can copy and paste those colors inside `global.css`.

## Component Usage

Everything used in the project is inside the `components` folder. To use a component, import it like this:

```
import { Button } from "@/components/ui/button";
```

## Query Parameters Usage

We are using **nuqs** for query parameters. Visit the [nuqs documentation](https://nuqs.47ng.com/docs/tips-tricks) for more details.

## Declaring Environment Variables

We use the **env** package. Visit the [env documentation](https://github.com/t3-oss/t3-env). First define variables in the `.env` file, then add them to `env.ts` for runtime validation.

## Typography Usage

We use a `Typography` component:

```
<Typography variant="h1">Hello, world!</Typography>
```

Refer to the Figma design and extend variant styles accordingly.

## Data Fetching

We use **TanStack Query**. See [official documentation](https://tanstack.com/query/latest/docs/framework/react/guides/queries) .

### How to Fetch Data

Use the custom hook `useFetch`:

```

import { useFetch } from "@/hooks/use-fetch";

const { data, isLoading, error } = useFetch<{id: string}>({
  path: "/api/path",
  queryKey: ["path"],
  config: {
    staleTime: 60 * 5,
  },
});

```

### Typed Query System

We use a utility-driven approach to define queries and strongly type them:

*   Define queries using `defineQuery`
*   Use `createTypedFetchHook` to fetch data
*   Use `createTypedInvalidationHook` to invalidate queries

```

// query-def.ts
export const QUERY_KEYS = {
  getData: defineQuery<[], { id: string }>({
    queryKey: ["get", "data"],
    path: "/api/path"
  }),
};

```

```

// in your component
import { useTypedFetch } from "@/lib/query";

const { data } = useTypedFetch("getData");

```

## Mutation (POST, PUT, DELETE, PATCH)

Use `useApi` hook. It supports toast feedback and different methods.

```

import { useApi } from "@/hooks/use-api";

export function Home() {
  const { onRequest } = useApi({});

  function handleSubmit() {
    onRequest({
      path: "/some-path",
      data: {},
      onSuccess: (data) => {
        // update local state
      },
      onError: (err) => {
        // handle error
      },
    });
  }

  return <button onClick={handleSubmit}>Submit</button>;
}

```

## MatchQueryStatus

This component simplifies UI states for query results:

*   `onSuccess` – when data is returned
*   `onError`, `onLoading`, `onEmpty` – for various states

```

import { MatchQueryStatus } from "@/components/match-query-status";
import { useTypedFetch } from "@/lib/query";

export default function Page() {
  const query = useTypedFetch("getData");

  return (
    <MatchQueryStatus
      query={query}
      onSuccess={(data) => {
        // render content
      }}
    />
  );
}

```

## Forms and Validation

Use [React Hook Form](https://react-hook-form.com/) and [Zod](https://github.com/colinhacks/zod) along with [shadcn/ui](https://ui.shadcn.com/docs/components/form).

```

"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function InputForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data) {
    // Handle submit
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

```

## Defining Zod Schemas

All zod schemas should be placed in the `/lib/schema` folder. Organize them into files based on logical domains.
