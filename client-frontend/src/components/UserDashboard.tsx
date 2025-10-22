import { Calendar, MapPin, Clock, Star } from "lucide-react";
import { useState } from "react";
import { useClientBookings } from "../hooks/useBookings";
import { useCreateReview } from "../hooks/useReviews";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function UserDashboard() {
  const { data: bookings, isLoading } = useClientBookings();
  const createReview = useCreateReview();
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<string | null>(null);

  const activeBookings = bookings?.filter(b => 
    b.status === "pending" || b.status === "confirmed" || b.status === "in_progress"
  ) || [];
  
  const completedBookings = bookings?.filter(b => b.status === "completed") || [];

  const handleRateProvider = (bookingId: string, providerId: string) => {
    setSelectedBookingForReview(bookingId);
    createReview.mutate({
      bookingId,
      providerId,
      rating: 5,
      comment: "Great service!",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <p className="text-muted-foreground">Track and manage your service bookings</p>
      </div>

      {/* Active Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Active Bookings</CardTitle>
          <CardDescription>Jobs currently in progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No active bookings at the moment
            </div>
          ) : (
            activeBookings.map((booking) => (
              <div
                key={booking.id}
                data-testid={`card-active-booking-${booking.id}`}
                className="rounded-lg border-l-4 border-l-primary bg-card p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">Booking #{booking.id.slice(0, 8)}</h4>
                    <p className="text-sm text-muted-foreground">
                      Provider ID: {booking.providerId.slice(0, 8)}
                    </p>
                  </div>
                  <Badge className="bg-primary" data-testid={`badge-status-${booking.id}`}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {booking.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {booking.type === "scheduled" && booking.scheduledDate
                      ? format(new Date(booking.scheduledDate), "MMM dd, yyyy")
                      : "Instant"}
                  </div>
                  <div className="font-semibold text-foreground">
                    UGX {Number(booking.estimatedPrice).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    data-testid={`button-message-${booking.id}`}
                    onClick={() => console.log("Message provider")}
                  >
                    Message
                  </Button>
                  <Button
                    size="sm"
                    data-testid={`button-track-${booking.id}`}
                    onClick={() => console.log("Track on map")}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Completed Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Bookings</CardTitle>
          <CardDescription>Your booking history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No completed bookings yet
            </div>
          ) : (
            completedBookings.map((booking) => (
              <div
                key={booking.id}
                data-testid={`card-completed-booking-${booking.id}`}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold">Booking #{booking.id.slice(0, 8)}</h4>
                  <p className="text-sm text-muted-foreground">
                    Provider: {booking.providerId.slice(0, 8)}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {booking.completedAt
                        ? format(new Date(booking.completedAt), "MMM dd, yyyy")
                        : format(new Date(booking.createdAt), "MMM dd, yyyy")}
                    </div>
                    <span className="text-sm font-semibold">
                      UGX {Number(booking.finalPrice || booking.estimatedPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    size="sm"
                    variant="outline"
                    data-testid={`button-rate-${booking.id}`}
                    onClick={() => handleRateProvider(booking.id, booking.providerId)}
                    disabled={createReview.isPending || selectedBookingForReview === booking.id}
                  >
                    {createReview.isPending && selectedBookingForReview === booking.id
                      ? "Rating..."
                      : "Rate Now"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
