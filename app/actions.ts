'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();

    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento so pode ser feito durante o horario comercial: 9h a 12h, 13h e 18h ou 19h as 21h',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });

    if (existingAppointment) {
      return {
        error: 'Ja possuimos um agendamento nesse horario',
      };
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    });
    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
}

export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();

    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento so pode ser feito durante o horario comercial: 9h a 12h, 13h e 18h ou 19h as 21h',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
        id: {
          not: id,
        },
      },
    });

    if (existingAppointment) {
      return {
        error: 'Ja possuimos um agendamento nesse horario',
      };
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    });

    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAppointment(id: string) {
  try {
    const existingAppointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!existingAppointment) {
      return {
        error: 'Agendamento nao encontrado',
      };
    }

    await prisma.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
}
