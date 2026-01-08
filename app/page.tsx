import { AppointmentForm } from '@/components/appointment-form';
import { PeriodSection } from '@/components/period-section';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { groupAppointmentByPeriod } from '@/utils/appointments-utils';

export default async function Home() {
  const appointments = await prisma.appointment.findMany();
  const periods = groupAppointmentByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-title-size  text-content-primary mb-2">
            Sua Agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui voce pode ver todos os clientes e servicos agendados para hoje
          </p>
        </div>
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
