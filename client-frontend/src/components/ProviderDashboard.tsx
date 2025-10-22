import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { DollarSign, Briefcase, Star, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { useOwnProviderProfile, useUpdateProviderProfile } from "../hooks/useProviderProfile";
import { useProviderBookings, useUpdateBooking } from "../hooks/useBookings";

export default function ProviderDashboard() {
  const { data: profile, isLoading: isLoadingProfile } = useOwnProviderProfile();
  const { data: bookings, isLoading: isLoadingBookings } = useProviderBookings();
  const updateProfile = useUpdateProviderProfile();
  const updateBooking = useUpdateBooking();

  const [isOnline, setIsOnline] = useState(false);

  // Sync isOnline state with loaded profile
  useEffect(() => {
    if (profile) {
      setIsOnline(profile.isOnline);
    }
  }, [profile]);

  const pendingBookings = bookings?.filter(b => b.status === "pending") || [];
  const activeBookings = bookings?.filter(b =>
    b.status === "confirmed" || b.status === "in_progress"
  ) || [];

  const handleOnlineToggle = (checked: boolean) => {
    setIsOnline(checked);
    if (profile) {
      updateProfile.mutate({
        id: profile.id,
        data: { isOnline: checked },
      });
    }
  };

  const handleAcceptJob = (bookingId: string) => {
    updateBooking.mutate({
      id: bookingId,
      data: { status: "confirmed" },
    });
  };

  const handleDeclineJob = (bookingId: string) => {
    updateBooking.mutate({
      id: bookingId,
      data: { status: "cancelled" },
    });
  };

  if (isLoadingProfile || isLoadingBookings) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>No Provider Profile</CardTitle>
            <CardDescription>
              You need to create a provider profile to access this dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => console.log("Create provider profile")}>
              Create Provider Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    earnings: Number(profile.totalEarnings) || 0,
    netEarnings: (Number(profile.totalEarnings) * 0.9) || 0,
    activeJobs: activeBookings.length,
    completedJobs: profile.completedJobs || 0,
    rating: Number(profile.rating) || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Provider Dashboard</h2>
          <p className="text-muted-foreground">Manage your services and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="online-toggle">Go Online</Label>
          <Switch
            id="online-toggle"
            data-testid="switch-online"
            checked={isOnline}
            onCheckedChange={handleOnlineToggle}
            disabled={updateProfile.isPending}
          />
          {isOnline && (
            <Badge className="bg-green-500" data-testid="badge-online">
              Online
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-earnings">
              UGX {stats.earnings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Net: UGX {stats.netEarnings.toLocaleString()} (10% commission)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-active-jobs">
              {stats.activeJobs}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.completedJobs} completed total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-rating">
              {stats.rating.toFixed(1)} ★
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {profile.reviewCount} reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {profile.verificationStatus === "verified" ? "Verified" : "Pending"}
            </div>
            <p className="text-xs text-muted-foreground">Tier: {profile.tier}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Job Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Job Requests</CardTitle>
          <CardDescription>Accept or decline incoming requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending requests at the moment
            </div>
          ) : (
            pendingBookings.map((job) => (
              <div
                key={job.id}
                data-testid={`card-job-${job.id}`}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold">Booking #{job.id.slice(0, 8)}</h4>
                  <p className="text-sm text-muted-foreground">
                    Client: {job.clientId.slice(0, 8)} • {job.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      UGX {Number(job.estimatedPrice).toLocaleString()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(job.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                  {job.notes && (
                    <p className="text-sm text-muted-foreground italic">
                      Note: {job.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    data-testid={`button-decline-${job.id}`}
                    variant="outline"
                    onClick={() => handleDeclineJob(job.id)}
                    disabled={updateBooking.isPending}
                  >
                    Decline
                  </Button>
                  <Button
                    data-testid={`button-accept-${job.id}`}
                    onClick={() => handleAcceptJob(job.id)}
                    disabled={updateBooking.isPending}
                  >
                    Accept
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
