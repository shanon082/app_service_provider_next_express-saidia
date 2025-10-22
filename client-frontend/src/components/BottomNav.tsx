import { Home, Search, PlusCircle, Briefcase, User } from "lucide-react";
import { useState } from "react";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "book", icon: PlusCircle, label: "Book" },
    { id: "jobs", icon: Briefcase, label: "Jobs" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-testid={`button-nav-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id);
                console.log(`Navigate to: ${tab.label}`);
              }}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-1 w-12 rounded-t-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
