import ProviderCard from "../ProviderCard";
import bodaImage from "@assets/generated_images/Boda_boda_driver_portrait_d8aa558f.png";
import plumberImage from "@assets/generated_images/Professional_plumber_at_work_8b0009b2.png";
import nurseImage from "@assets/generated_images/Healthcare_nurse_professional_portrait_5b3d733d.png";

export default function ProviderCardExample() {
  //todo: remove mock functionality
  const mockProviders = [
    {
      id: "1",
      name: "John Okello",
      photo: bodaImage,
      service: "Boda Boda",
      rating: 4.7,
      reviewCount: 89,
      distance: "2km away",
      estimatedPrice: "UGX 3,000",
      verified: true,
    },
    {
      id: "2",
      name: "Grace Namata",
      photo: plumberImage,
      service: "Plumber",
      rating: 4.9,
      reviewCount: 124,
      distance: "1.5km away",
      estimatedPrice: "UGX 10,000/hr",
      verified: true,
    },
    {
      id: "3",
      name: "Sarah Akello",
      photo: nurseImage,
      service: "Nurse",
      rating: 4.8,
      reviewCount: 67,
      distance: "3km away",
      estimatedPrice: "UGX 15,000",
      verified: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockProviders.map((provider) => (
        <ProviderCard key={provider.id} {...provider} />
      ))}
    </div>
  );
}
