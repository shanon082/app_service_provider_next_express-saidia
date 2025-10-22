import { Route } from "wouter";
import BottomNav from "./components/BottomNav";
import TopNav from "./components/TopNav";
import { Skeleton } from "./components/ui/skeleton";
import { Switch } from "./components/ui/switch";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";
import { queryClient } from "./lib/queryClient";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import UserBookings from "./pages/UserBookings";
import ProviderPortal from "./pages/ProviderPortal";
import NotFound from "./pages/not-found";
import { Toaster } from "./components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bookings" component={UserBookings} />
      <Route path="/provider" component={ProviderPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const { user } = useAuth();
  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "Guest";
  const location = user?.location || "Uganda";

  return (
    <>
      <TopNav 
        userName={userName}
        userPhoto={user?.profileImageUrl || undefined}
        location={location}
      />
      <Router />
      <BottomNav />
    </>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // user is authenticated
  if (user) {
    return <AuthenticatedApp />;
  }

  // user is null (401 response) - show landing page which has login button
  return <Landing />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
