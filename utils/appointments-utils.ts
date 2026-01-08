import type { Appointment as AppointmentPrisma } from '@/app/generated/prisma';
import type {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/types/appointments';

export function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
}

export function groupAppointmentByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments?.map((apt) => ({
    ...apt,
    time: apt.scheduleAt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    service: apt.description,
    period: getPeriod(apt.scheduleAt.getHours()),
  }));

  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );

  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );

  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'morning',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
}
