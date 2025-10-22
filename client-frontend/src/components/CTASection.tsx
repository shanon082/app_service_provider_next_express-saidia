import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-center text-white md:p-12">
          <h2 className="mb-4 font-['Outfit'] text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Join thousands of Ugandans connecting with trusted service providers
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              data-testid="button-cta-find-services"
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-primary"
              onClick={() => console.log("Find Services clicked")}
            >
              Find Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              data-testid="button-cta-become-provider"
              size="lg"
              className="bg-accent hover:bg-accent/90"
              onClick={() => console.log("Become Provider clicked")}
            >
              Become a Provider
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
