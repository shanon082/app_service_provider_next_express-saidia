import { useQuery } from "@tanstack/react-query";
import type { ProviderProfile, Service, User } from "./schema";

interface ProviderWithDetails extends ProviderProfile {
  user: User;
  services: Service[];
}

interface ProvidersFilters {
  category?: string;
  verified?: boolean;
  location?: string;
  isOnline?: boolean;
}

export function useProviders(filters?: ProvidersFilters) {
  const queryParams = new URLSearchParams();
  if (filters?.category) queryParams.append("category", filters.category);
  if (filters?.verified !== undefined) queryParams.append("verified", String(filters.verified));
  if (filters?.location) queryParams.append("location", filters.location);
  if (filters?.isOnline !== undefined) queryParams.append("isOnline", String(filters.isOnline));

  const queryString = queryParams.toString();
  const url = queryString ? `/api/providers?${queryString}` : "/api/providers";

  return useQuery<ProviderWithDetails[]>({
    queryKey: ["/api/providers", filters],
  });
}

export function useProvider(id: string | undefined) {
  return useQuery<ProviderWithDetails>({
    queryKey: ["/api/providers", id],
    enabled: !!id,
  });
}
