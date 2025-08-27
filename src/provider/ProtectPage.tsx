"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoaderScreen } from "@/Components/loader/loading";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("Token:");

    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get("http://localhost:4001/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setLoading(false))
      .catch(() => router.push("/"));
  }, [router]);

  if (loading) return <LoaderScreen />;

  return <>{children}</>;
}
