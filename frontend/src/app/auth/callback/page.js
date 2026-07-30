"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("access_token", token);
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [searchParams, router]);

  return (
    <main>
      <p>Signing you in...</p>
    </main>
  );
}