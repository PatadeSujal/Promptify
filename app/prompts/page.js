// app/prompts/page.js (Next.js App Router)
"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowCart page={page} />
      </Suspense>
    </div>
  );
}
