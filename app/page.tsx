"use client";
import { Typography } from "@/components/ui/typography";
import useApi from "@/hooks/use-api";
import { useTypedFetch, useTypedInvalidation } from "@/lib/query";
export default function Home() {

const {data} = useTypedFetch("all",{
  params:{
    id:1
  },
  searchParams:{
    searchParams:"test"
  }


})
const { invalidateQuery} = useTypedInvalidation();

return (
    <div className={"grid w-full  grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"}>

      <Typography as={"h1"}>Hello</Typography>
      <button onClick={()=>{
        invalidateQuery("all",{
          id:1
        })
      }}>Button</button>
    </div>
  );
}
