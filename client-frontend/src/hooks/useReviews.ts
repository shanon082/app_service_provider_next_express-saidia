import { useMutation, useQuery } from "@tanstack/react-query";
import type { InsertReview, Review } from "./schema";
import { useToast } from "./use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { isUnauthorizedError } from "../lib/authUtils";

export function useCreateReview() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Omit<InsertReview, "clientId">) => {
      const res = await apiRequest("POST", "/api/reviews", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback",
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
          title: "Error submitting review",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });
}

export function useProviderReviews(providerId: string | undefined) {
  return useQuery<Review[]>({
    queryKey: ["/api/reviews/provider", providerId],
    enabled: !!providerId,
  });
}
