// app/prompts/page.js (Next.js App Router)
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ShowCart from "../components/ShowCart";

export default function PromptsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    if (!page) {
      // redirect to page=1 if no query param
      router.replace("/prompts?page=1");
    }
  }, [page, router]);

  return (
     <div >
        <ShowCart page = {page} />

    </div>
  );
}
