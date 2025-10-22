import { Search, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface HeroSectionProps {
  backgroundImage?: string;
}

export default function HeroSection({ backgroundImage }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Soroti");

  const handleSearch = () => {
    console.log("Search triggered:", searchQuery, location);
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-2xl">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Ugandan marketplace"
            className="h-full w-full object-cover"
          />
        )}
        {/* Dark wash gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-accent/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-['Outfit'] text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Uganda's Trusted<br />Service Marketplace
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/95 md:text-xl">
          Book verified bodas, plumbers, nurses & more
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl rounded-full bg-white p-2 shadow-2xl">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                data-testid="input-hero-search"
                type="search"
                placeholder="Find boda, plumber, nurse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-12 border-0 pl-12 text-base focus-visible:ring-0"
              />
            </div>
            <div className="relative w-full md:w-48">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                data-testid="input-hero-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 border-0 pl-12 text-base focus-visible:ring-0"
              />
            </div>
            <Button
              data-testid="button-hero-search"
              onClick={handleSearch}
              size="lg"
              className="h-12 rounded-full px-8 font-semibold"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span>50+ Verified Providers</span>
          </div>
          <div className="hidden h-4 w-px bg-white/30 sm:block" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span>500+ Jobs Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
