import CategoryCard from "../CategoryCard";
import { Bike, Wrench, Heart, Briefcase, Tractor, Construction } from "lucide-react";

export default function CategoryCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <CategoryCard icon={Bike} title="Boda Boda" />
      <CategoryCard icon={Wrench} title="Plumber" />
      <CategoryCard icon={Heart} title="Nurse" />
      <CategoryCard icon={Briefcase} title="Professional" />
      <CategoryCard icon={Tractor} title="Agriculture" />
      <CategoryCard icon={Construction} title="Electrician" />
    </div>
  );
}
