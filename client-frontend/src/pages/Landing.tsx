import { Bike, Wrench, Heart, Briefcase, Tractor, Construction } from "lucide-react";
import heroImage from "../assets/Ugandan_marketplace_hero_background_850a8a34.png";
import { Button } from "../components/ui/button";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASection";

export default function Landing() {
  const categories = [
    { icon: Bike, title: "Boda Boda" },
    { icon: Wrench, title: "Plumber" },
    { icon: Heart, title: "Nurse" },
    { icon: Briefcase, title: "Professional" },
    { icon: Tractor, title: "Agriculture" },
    { icon: Construction, title: "Electrician" },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Bar with Login */}
      <div className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="font-['Outfit'] text-xl font-bold text-white">S</span>
            </div>
            <h1 className="font-['Outfit'] text-xl font-bold">Saidia</h1>
          </div>
          <Button
            data-testid="button-login"
            onClick={() => (window.location.href = "/api/login")}
          >
            Log In
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-8">
        <HeroSection backgroundImage={heroImage} />

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

        <HowItWorks />
        <CTASection />
      </div>

      <footer className="border-t bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          © 2025 Saidia. Uganda's Trusted Service Marketplace
        </div>
      </footer>
    </div>
  );
}
