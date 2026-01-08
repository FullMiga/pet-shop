'use client';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/appointments';
import { AppointmentForm } from '@/components/appointment-form';
import { Button } from '@/components/ui/button';
import { Pen as EditIcon, Loader2, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { deleteAppointment } from '@/app/actions';
import { toast } from 'sonner';

type AppointmentCardProps = {
  appointment: Appointment;
  hasMore?: boolean;
};

export function AppointmentCard({
  appointment,
  hasMore,
}: AppointmentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await deleteAppointment(appointment.id);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Agendamento removido com sucesso!');
    setIsDeleting(false);
  };

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
      <div className="text-paragraph-small-size text-content-secondary ml-auto flex gap-2">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <EditIcon size={16} />
          </Button>
        </AppointmentForm>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="remove" size="icon">
              <Trash size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover agendamento</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover esse agendamento? Esta acao nao
                pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  'Remover'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
