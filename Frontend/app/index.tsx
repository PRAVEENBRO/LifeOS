import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Example: backend health check
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        console.log("HEALTH:", data);
        setIsAuthenticated(false);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return null;

  return isAuthenticated ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
