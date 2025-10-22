import { useQuery } from "@tanstack/react-query";
import type { User } from "./schema";
import { getQueryFn } from "../lib/queryClient";

export function useAuth() {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: user !== null && user !== undefined,
  };
}
