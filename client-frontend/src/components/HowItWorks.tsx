import { Search, UserCheck, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Search & Discover",
      description: "Find verified service providers near you with ratings and reviews",
    },
    {
      number: 2,
      icon: UserCheck,
      title: "Book & Connect",
      description: "Choose instant or scheduled booking, add details, and confirm",
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Complete & Rate",
      description: "Pay securely via mobile money, complete job, and leave a review",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-['Outfit'] text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get the help you need in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
                data-testid={`step-${step.number}`}
              >
                {/* Number Badge */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-10 w-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Connector Line (hidden on last item) */}
                {step.number < 3 && (
                  <div className="absolute left-full top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary to-accent md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
