import { AppointmentPeriod } from '@/types/appointments';
import { CloudSunIcon, MoonStar, Sun } from 'lucide-react';
import { AppointmentCard } from '../appointment-card';

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <CloudSunIcon className="text-accent-orange" />,
  evening: <MoonStar className="text-accent-yellow" />,
};

type PeriodSectionProps = {
  period: AppointmentPeriod;
};

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between border-b border-border-divisor">
        <div className="flex items-center gap-2">
          {periodIcons[period.type]}
          <h2 className="text-label-large-size text-content-primary">
            {period.title}
          </h2>
        </div>
        <span className="text-label-large-size text-content-secondary font-bold">
          {period.timeRange}
        </span>
      </div>

      <div className="p-5 space-y-3">
        {period.appointments.length > 0 ? (
          period.appointments.map((apt, index) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              hasMore={index < period.appointments.length - 1}
            />
          ))
        ) : (
          <p className="text-paragraph-small-size text-content-secondary px-4">
            Nenhum agendamento para este periodo
          </p>
        )}
      </div>
    </section>
  );
};
