import { AppointmentForm } from '@/components/appointment-form';
import { PeriodSection } from '@/components/period-section';
import { groupAppointmentByPeriod } from '@/utils/appointments-utils';

const appointments = [
  {
    id: '1',
    petName: 'Rex',
    tutorName: 'Joao',
    description: 'Consulta',
    phone: '11 123456789',
    scheduleAt: new Date('2026-01-05T11:00:00'),
  },
  {
    id: '2',
    petName: 'Mimi',
    tutorName: 'Joao',
    description: 'Banho',
    phone: '11 123456789',
    scheduleAt: new Date('2026-01-05T13:00:00'),
  },
  {
    id: '3',
    petName: 'Pepi',
    tutorName: 'Ricardo',
    description: 'Vacina',
    phone: '11 123456789',
    scheduleAt: new Date('2026-01-05T15:00:00'),
  },
  {
    id: '4',
    petName: 'Luna',
    tutorName: 'Pedro',
    description: 'Vacina',
    phone: '11 123456789',
    scheduleAt: new Date('2026-01-05T16:00:00'),
  },
  {
    id: '5',
    petName: 'Nina',
    tutorName: 'Natalia',
    description: 'Consulta',
    phone: '11 123456789',
    scheduleAt: new Date('2026-01-05T20:00:00'),
  },
];

export default function Home() {
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
        <AppointmentForm />
      </div>
    </div>
  );
}
