import { AppointmentForm } from '@/components/appointment-form';
import { DatePicker } from '@/components/date-picker';
import { PeriodSection } from '@/components/period-section';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { groupAppointmentByPeriod } from '@/utils/appointments-utils';
import { endOfDay, startOfDay } from 'date-fns';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const selectedDate = date ? new Date(date) : new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });
  const periods = groupAppointmentByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex md:items-center justify-between flex-col gap-2 md:flex-row md:gap-0 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-title-size  text-content-primary mb-2">
              Sua Agenda
            </h1>
            <p className="text-paragraph-medium-size text-content-secondary">
              Aqui voce pode ver todos os clientes e servicos agendados para
              hoje
            </p>
          </div>
        </div>
        <DatePicker />
      </div>

      {periods.map((period, index) => (
        <PeriodSection key={index} period={period} />
      ))}

      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center p-5 bg-[#23242C] md:bg-transparent md:bottom-8 md:right-8 md:left-auto md:top-auto md:w-auto md:p-0">
        <AppointmentForm>
          <Button variant="brand">Novo agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
