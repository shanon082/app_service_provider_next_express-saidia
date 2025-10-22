import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import type { Booking, InsertBooking } from "./schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { isUnauthorizedError } from "../lib/authUtils";

export function useCreateBooking() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Omit<InsertBooking, "clientId" | "commission">) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings/client"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings/provider"] });
      toast({
        title: "Booking created",
        description: "Your booking has been created successfully",
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
          title: "Error creating booking",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useClientBookings() {
  const { toast } = useToast();

  return useQuery<Booking[]>({
    queryKey: ["/api/bookings/client"],
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

export function useProviderBookings() {
  const { toast } = useToast();

  return useQuery<Booking[]>({
    queryKey: ["/api/bookings/provider"],
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

export function useUpdateBooking() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBooking> }) => {
      const res = await apiRequest("PUT", `/api/bookings/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings/client"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings/provider"] });
      toast({
        title: "Booking updated",
        description: "Booking status has been updated",
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
          title: "Error updating booking",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}
