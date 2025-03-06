import { Typography } from "@/components/ui/typography";
import Image from "next/image";
export default function Home() {
  [1, 2, 3].map(function (i) {
    return i;
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Typography as="h1">Hello</Typography>
    </div>
  );
}
