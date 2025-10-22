import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";
import type { InsertProviderProfile, ProviderProfile } from "./schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { isUnauthorizedError } from "../lib/authUtils";

export function useCreateProviderProfile() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Omit<InsertProviderProfile, "userId">) => {
      const res = await apiRequest("POST", "/api/providers", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Provider profile created",
        description: "You can now start offering services",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Authentication required",
          description: "Please log in to continue",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
      } else {
        toast({
          title: "Error creating profile",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useUpdateProviderProfile() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProviderProfile> }) => {
      const res = await apiRequest("PUT", `/api/providers/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/providers"] });
      toast({
        title: "Profile updated",
        description: "Your provider profile has been updated",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Authentication required",
          description: "Please log in to continue",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
      } else {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useOwnProviderProfile() {
  const { user } = useAuth();
  const { toast } = useToast();

  return useQuery<ProviderProfile>({
    queryKey: ["/api/providers/own", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      const res = await fetch(`/api/providers?userId=${user.id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status}: ${text}`);
      }
      const providers = await res.json();
      return providers[0];
    },
    enabled: !!user?.id,
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Authentication required",
          description: "Please log in to continue",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return false;
      }
      return failureCount < 3;
    },
  });
}
