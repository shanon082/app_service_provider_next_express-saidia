import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export default function CategoryCard({ icon: Icon, title, onClick }: CategoryCardProps) {
  return (
    <button
      data-testid={`card-category-${title.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={() => {
        console.log(`Category clicked: ${title}`);
        onClick?.();
      }}
      className="group flex h-32 w-full flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-md transition-all hover:shadow-lg active-elevate-2"
    >
      <Icon className="h-10 w-10 transition-transform group-hover:scale-110" />
      <span className="text-center font-semibold">{title}</span>
    </button>
  );
}
