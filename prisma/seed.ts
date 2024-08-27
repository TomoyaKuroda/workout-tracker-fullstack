import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const exercises = [
    {
      name: 'Push-up',
      description: 'A classic bodyweight exercise that targets the chest, shoulders, and triceps.',
      category: 'strength',
      muscleGroup: 'chest',
    },
    {
      name: 'Squat',
      description: 'A compound exercise that primarily targets the legs and core.',
      category: 'strength',
      muscleGroup: 'legs',
    },
    {
      name: 'Plank',
      description: 'An isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.',
      category: 'core',
      muscleGroup: 'abs',
    },
    // Add more exercises here
  ]

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: exercise,
    })
  }

  console.log('Seed data inserted successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })