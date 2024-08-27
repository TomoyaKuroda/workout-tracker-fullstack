import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const { name, scheduledAt, exercises } = req.body
      const workout = await prisma.workoutPlan.create({
        data: {
          name,
          scheduledAt: new Date(scheduledAt),
          userId: session.user.id,
          workoutExercises: {
            create: exercises.map((exercise: any) => ({
              exerciseId: exercise.id,
              sets: exercise.sets,
              reps: exercise.reps,
              weight: exercise.weight,
              comments: exercise.comments,
            })),
          },
        },
        include: {
          workoutExercises: {
            include: { exercise: true },
          },
        },
      })
      res.status(201).json(workout)
    } catch (error) {
      console.error('Error creating workout:', error)
      res.status(500).json({ error: 'Error creating workout' })
    }
  } else if (req.method === 'GET') {
    try {
      const workouts = await prisma.workoutPlan.findMany({
        where: { userId: session.user.id },
        include: {
          workoutExercises: {
            include: { exercise: true },
          },
        },
        orderBy: { scheduledAt: 'desc' },
      })
      res.status(200).json(workouts)
    } catch (error) {
      console.error('Error fetching workouts:', error)
      res.status(500).json({ error: 'Error fetching workouts' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}