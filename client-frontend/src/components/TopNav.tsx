import { useState } from "react";
import { Button } from "./ui/button";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TopNavProps {
  userName?: string;
  userPhoto?: string;
  location?: string;
}

export default function TopNav({ userName = "Guest", userPhoto, location = "Soroti" }: TopNavProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    console.log("Dark mode:", !isDark);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <span className="font-['Outfit'] text-xl font-bold text-white">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-['Outfit'] text-xl font-bold">Saidia</h1>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" data-testid="button-nav-home">
            Home
          </Button>
          <Button variant="ghost" data-testid="button-nav-services">
            Services
          </Button>
          <Button variant="ghost" data-testid="button-nav-how-it-works">
            How It Works
          </Button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            data-testid="button-theme-toggle"
            onClick={toggleDarkMode}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                data-testid="button-user-menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userPhoto} alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-profile">Profile</DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-bookings">My Bookings</DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-wallet">Wallet</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-logout">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
