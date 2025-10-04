"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShowCart from "../components/ShowCart";

function PromptsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    if (!page) {
      router.replace("/prompts?page=1");
    }
  }, [page, router]);

  return <ShowCart page={page || 1} />;
}

export default function PromptsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PromptsContent />
      </Suspense>
    </div>
  );
}
