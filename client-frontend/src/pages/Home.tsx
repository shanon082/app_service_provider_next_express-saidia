import { useState } from "react";
import { useProviders } from "../hooks/useProviders";
import { Bike, Briefcase, Construction, Heart, Tractor, Wrench } from "lucide-react";
import CategoryCard from "../components/examples/CategoryCard";
import HeroSection from "../components/HeroSection";
import { Skeleton } from "../components/ui/skeleton";
import ProviderCard from "../components/ProviderCard";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASection";
import BookingModal from "../components/BookingModal";
import heroImage from "../assets/Ugandan_marketplace_hero_background_850a8a34.png";

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<{ 
    id: string;
    name: string; 
    service: string;
    serviceId: string;
    estimatedPrice: string;
  } | null>(null);

  const { data: providers, isLoading: isLoadingProviders } = useProviders({ verified: true });

  const categories = [
    { icon: Bike, title: "Boda Boda" },
    { icon: Wrench, title: "Plumber" },
    { icon: Heart, title: "Nurse" },
    { icon: Briefcase, title: "Professional" },
    { icon: Tractor, title: "Agriculture" },
    { icon: Construction, title: "Electrician" },
  ];

  const handleViewProfile = (provider: {
    id: string;
    name: string;
    service: string;
    serviceId: string;
    estimatedPrice: string;
  }) => {
    setSelectedProvider(provider);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-8">
        {/* Hero Section */}
        <HeroSection backgroundImage={heroImage} />

        {/* Categories */}
        <section>
          <h2 className="mb-6 font-['Outfit'] text-2xl font-bold md:text-3xl">
            Browse Services
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        {/* Top Rated Providers */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-['Outfit'] text-2xl font-bold md:text-3xl">
              Top Rated Providers
            </h2>
          </div>
          {isLoadingProviders ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 rounded-xl bg-card p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : providers && providers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => {
                const userName = `${provider.user.firstName || ''} ${provider.user.lastName || ''}`.trim();
                const mainService = provider.services[0];
                const estimatedPrice = mainService ? `UGX ${Number(mainService.price).toLocaleString()}${mainService.priceUnit !== 'per job' ? '/' + mainService.priceUnit.replace('per ', '') : ''}` : "UGX 0";
                
                return (
                  <ProviderCard
                    key={provider.id}
                    id={provider.id}
                    name={userName}
                    photo={provider.user.profileImageUrl || undefined}
                    service={mainService?.name || "Service Provider"}
                    rating={Number(provider.rating) || 0}
                    reviewCount={provider.reviewCount}
                    distance="Available"
                    estimatedPrice={estimatedPrice}
                    verified={provider.verificationStatus === "verified"}
                    onViewProfile={() => handleViewProfile({
                      id: provider.id,
                      name: userName,
                      service: mainService?.name || "Service",
                      serviceId: mainService?.id || "",
                      estimatedPrice,
                    })}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-muted p-12 text-center">
              <p className="text-muted-foreground">
                No providers available at the moment. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* CTA */}
        <CTASection />
      </div>

      {/* Booking Modal */}
      {selectedProvider && (
        <BookingModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
          providerId={selectedProvider.id}
          providerName={selectedProvider.name}
          service={selectedProvider.service}
          serviceId={selectedProvider.serviceId}
          estimatedPrice={selectedProvider.estimatedPrice}
        />
      )}
    </div>
  );
}
