# This a Next.js template

## Color Palette Generation for shadcn
You can visit [this](https://oxidus.vercel.app/). It will generate the color palette for you. You can just copy paste those colors inside of global.css
## Component Usage
Every thing which is used in the project is in the components folder. If you want to use a component in your project, you can import it from the components folder. For example, if you want to use the Button component, you can import it like this:

```jsx
import { Button } from "@/components/ui/button";
```

## Query Parameters Usage
We are using nuqs for query parameters management.You can visit the [nuqs documentation](https://nuqs.47ng.com/docs/tips-tricks) for more information. Every thing related to the query handling will be done through this package. You can view its documentation.


## Declaring Environment Variables
We are using the env package to declare environment variables. You can visit the [env documentation](https://github.com/t3-oss/t3-env) for more information. Every thing related to the environment variables will be done through this package. You can view its documentation.First we will declare the environment variables in the .env file.
Then you will define this inside of the env.ts file.It will be used for runtime validation on environment variables.
## Typography Usage
We have a component named Typography which is used to render text. You can use it like this:

```tsx
<Typography variant="h1">Hello, world!</Typography>
```

First go through the whole figma design and then add those styles according to it inside of variants in the Typography component.


## Data Fetching
We are using tanstack query for data fetching. Checkout the [tanstack query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/queries) for more information.



### How to fetch using tanstack query

I have created a hook called useFetch which is used to fetch data from the server. You can use it like this:


```tsx
import { useFetch } from "@/hooks/use-fetch";
// Also you can pass generic to useFetch hook. The data will be of that type.

const { data, isLoading, error } = useFetch<{id:string}>({
    // the data will be of type {id:string}
// Other half path is defined inside of the useFetch hook. The path is coming from .env file.
  path: "/api/path",
  // queryKey will be unique for each request. Because it will be used for caching.
  queryKey: ["path"],
  // config is optional. You can pass any options from tanstack query.
  config: {
    staleTime: 60 * 5,
  },

});
```


You will create a folder named services in the main directory. Inside of the folder we will have files related to each api call or you can defined multiple services into a single file.

```tsx
// services/get-data.ts
import { useFetch } from "@/hooks/use-fetch";
export function useGetData(){
    const query = useFetch<{id:string}>({
        path: "/api/path",
        queryKey: ["path"],
    });
    return query;
}

```
### How to use this hook/services inside of the any file.
There is another utility component named **MatchQueryStatus**.
Its accepts 5 props.
  - query: The query result from react-query.
  - onWithLoadingState: Callback invoked with query data and loading state.
  - onError: Optional custom error renderer.
  - onLoading: Optional custom loading renderer. Defaults to a Loader.
  - onEmpty: Optional renderer when the query returns empty data. Defaults to an EmptyCard.
  - onSuccess: Callback invoked when the query successfully returns non-empty data.


```tsx
import { MatchQueryStatus } from "@/components/match-query-status";
import { useGetData } from "@/services/get-data";

export default function Home() {
  const query = useGetData();
  return (<MatchQueryStatus
        query={data}
        // this data will have the type which we have given in the useFetch hook.
        // If you want to Show Different Loader pass a react component to onLoading Prop
        // onLoading={<Loader />}
        //else the default loader will be shown.
        // same for empty card and error card.
        onSuccess={(data)=>{

            //Do whatever with data
        }}
        />
)}

```
