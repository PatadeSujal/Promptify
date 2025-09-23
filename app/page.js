"use client"
import Image from "next/image";
import ShowCart from "./components/ShowCart";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/prompts?page=1")
  return (
    <>
      <div >
        <ShowCart />

      </div>
    </>
  );
}
