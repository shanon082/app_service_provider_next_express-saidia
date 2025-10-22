import { Star, MapPin, CheckCircle2, Badge } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface ProviderCardProps {
  id: string;
  name: string;
  photo?: string;
  service: string;
  rating: number;
  reviewCount: number;
  distance: string;
  estimatedPrice: string;
  verified: boolean;
  onViewProfile?: () => void;
}

export default function ProviderCard({
  id,
  name,
  photo,
  service,
  rating,
  reviewCount,
  distance,
  estimatedPrice,
  verified,
  onViewProfile,
}: ProviderCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      data-testid={`card-provider-${id}`}
      className="rounded-xl bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Provider Info */}
      <div className="mb-4 flex items-start gap-3">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          {verified && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
              <CheckCircle2 className="h-5 w-5 fill-accent text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold truncate" data-testid={`text-provider-name-${id}`}>
              {name}
            </h3>
            {verified && (
              <Badge className="bg-accent hover:bg-accent text-xs" data-testid={`badge-verified-${id}`}>
                Verified
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{service}</p>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{distance}</span>
        </div>
        <span className="font-bold text-primary" data-testid={`text-price-${id}`}>
          {estimatedPrice}
        </span>
      </div>

      {/* Action */}
      <Button
        data-testid={`button-view-profile-${id}`}
        variant="outline"
        className="w-full"
        onClick={() => {
          console.log(`View profile: ${name}`);
          onViewProfile?.();
        }}
      >
        View Profile
      </Button>
    </div>
  );
}
