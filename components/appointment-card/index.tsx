import { cn } from '@/lib/utils';
import { Appointment } from '@/types/appointments';
import { AppointmentForm } from '../appointment-form';
import { Button } from '../ui/button';
import { Pen as EditIcon } from 'lucide-react';

type AppointmentCardProps = {
  appointment: Appointment;
  hasMore?: boolean;
};

export function AppointmentCard({
  appointment,
  hasMore,
}: AppointmentCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row justify-between items-center p-4',
        hasMore && 'border-b border-border-divisor'
      )}
    >
      <div className="flex flex-col md:gap-4 md:flex-row">
        <div className="flex gap-4 items-center text-label-small-size text-content-primary">
          <div className="w-11 font-semibold">{appointment.time}</div>
          <div className="w-48.75 flex items-center gap-1 font-semibold">
            {appointment.petName}
            <span className="text-paragraph-small-size text-content-secondary font-normal">
              / {appointment.tutorName}
            </span>
          </div>
        </div>
        <div className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </div>
      </div>
      <div className="text-paragraph-small-size text-content-secondary ml-auto">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <EditIcon size={16} />
          </Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
