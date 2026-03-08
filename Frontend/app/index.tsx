import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { checkBackendHealth } from "@/src/core/api/health.api";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        console.log("HEALTH:", data);
      })
      .catch((error) => {
        // Keep app usable even if backend is temporarily unreachable.
        console.warn("HEALTH_CHECK_FAILED", error);
      })
      .finally(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;

  return isAuthenticated ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
