import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { isUnauthorizedError } from "../lib/authUtils";
import type { InsertService, Service } from "./schema";

export function useCreateService() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Omit<InsertService, "providerId">) => {
      const res = await apiRequest("POST", "/api/services", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Service created",
        description: "Your service has been added successfully",
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
          title: "Error creating service",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useUpdateService() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertService> }) => {
      const res = await apiRequest("PUT", `/api/services/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Service updated",
        description: "Your service has been updated successfully",
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
          title: "Error updating service",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useDeleteService() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Service deleted",
        description: "Your service has been removed",
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
          title: "Error deleting service",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useProviderServices(providerId: string | undefined) {
  return useQuery<Service[]>({
    queryKey: ["/api/services/provider", providerId],
    enabled: !!providerId,
  });
}
