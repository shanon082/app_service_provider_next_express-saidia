import { useState } from "react";
import BookingModal from "../BookingModal";
import { Button } from "@/components/ui/button";

export default function BookingModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} data-testid="button-open-booking">
        Open Booking Modal
      </Button>
      <BookingModal
        open={open}
        onOpenChange={setOpen}
        providerName="John Okello"
        service="Boda Boda"
      />
    </div>
  );
}
