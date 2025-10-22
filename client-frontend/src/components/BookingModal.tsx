import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar, Clock, MapPin, Upload } from "lucide-react";
import { useCreateBooking } from "../hooks/useBookings";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerId: string;
  providerName: string;
  service: string;
  serviceId: string;
  estimatedPrice: string;
}

export default function BookingModal({
  open,
  onOpenChange,
  providerId,
  providerName,
  service,
  serviceId,
  estimatedPrice,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">("instant");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const createBooking = useCreateBooking();

  const handleConfirm = () => {
    const priceMatch = estimatedPrice.match(/[\d,]+/);
    const price = priceMatch ? priceMatch[0].replace(/,/g, '') : "0";

    createBooking.mutate(
      {
        providerId,
        serviceId,
        type: bookingType,
        location: location || "Not specified",
        notes,
        scheduledDate: bookingType === "scheduled" && scheduledDate ? new Date(scheduledDate) : undefined,
        scheduledTime: bookingType === "scheduled" ? scheduledTime : undefined,
        estimatedPrice: price,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setStep(1);
          setLocation("");
          setNotes("");
          setScheduledDate("");
          setScheduledTime("");
        },
      }
    );
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setStep(1);
      setLocation("");
      setNotes("");
      setScheduledDate("");
      setScheduledTime("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg" data-testid="modal-booking">
        <DialogHeader>
          <DialogTitle>Book {service}</DialogTitle>
          <DialogDescription>
            Booking with {providerName}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 w-2 rounded-full ${
                num === step ? "bg-accent" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="space-y-4">
            <Label>Select Booking Type</Label>
            <RadioGroup value={bookingType} onValueChange={(value) => setBookingType(value as "instant" | "scheduled")}>
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover-elevate">
                <RadioGroupItem value="instant" id="instant" data-testid="radio-instant" />
                <Label htmlFor="instant" className="flex flex-1 cursor-pointer flex-col">
                  <span className="font-semibold">Instant Booking</span>
                  <span className="text-sm text-muted-foreground">
                    Book this provider now
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover-elevate">
                <RadioGroupItem value="scheduled" id="scheduled" data-testid="radio-scheduled" />
                <Label htmlFor="scheduled" className="flex flex-1 cursor-pointer flex-col">
                  <span className="font-semibold">Scheduled Booking</span>
                  <span className="text-sm text-muted-foreground">
                    Pick date and time
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">
                <MapPin className="mb-1 inline h-4 w-4" /> Location
              </Label>
              <Input
                id="location"
                data-testid="input-location"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {bookingType === "scheduled" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">
                    <Calendar className="mb-1 inline h-4 w-4" /> Date
                  </Label>
                  <Input
                    id="date"
                    data-testid="input-date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">
                    <Clock className="mb-1 inline h-4 w-4" /> Time
                  </Label>
                  <Input
                    id="time"
                    data-testid="input-time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                data-testid="textarea-notes"
                placeholder="E.g., Leak in kitchen sink"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label>
                <Upload className="mb-1 inline h-4 w-4" /> Upload Photos (Optional)
              </Label>
              <div className="mt-2 flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover-elevate">
                <p className="text-sm text-muted-foreground">Click to upload</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 font-semibold">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Provider:</span> {providerName}
                </p>
                <p>
                  <span className="text-muted-foreground">Service:</span> {service}
                </p>
                <p>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  {bookingType === "instant" ? "Instant" : "Scheduled"}
                </p>
                {bookingType === "scheduled" && scheduledDate && (
                  <p>
                    <span className="text-muted-foreground">Scheduled for:</span>{" "}
                    {new Date(scheduledDate).toLocaleDateString()} {scheduledTime && `at ${scheduledTime}`}
                  </p>
                )}
                <p>
                  <span className="text-muted-foreground">Location:</span> {location || "Not specified"}
                </p>
                {notes && (
                  <p>
                    <span className="text-muted-foreground">Notes:</span> {notes}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Estimated Cost</span>
                <span className="text-xl font-bold text-primary">{estimatedPrice}</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {step > 1 && (
            <Button
              data-testid="button-back"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={createBooking.isPending}
            >
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              data-testid="button-next"
              className="flex-1"
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              data-testid="button-confirm"
              className="flex-1"
              onClick={handleConfirm}
              disabled={createBooking.isPending}
            >
              {createBooking.isPending ? "Creating..." : "Confirm Booking"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
