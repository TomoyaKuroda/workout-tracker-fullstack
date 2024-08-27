'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { format } from 'date-fns'
import { FaPlus } from 'react-icons/fa'

interface Workout {
  id: string
  name: string
  scheduledAt: string
  workoutExercises: Array<{
    exercise: {
      name: string
    }
    sets: number
    reps: number
    weight: number
  }>
}

export default function Workouts() {
  const { data: session } = useSession()
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    if (session) {
      fetch('/api/workouts')
        .then((res) => res.json())
        .then((data) => setWorkouts(data))
    }
  }, [session])

  if (!session) {
    return <div>Please sign in to view your workouts.</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Workouts</h1>
        <Link
          href="/workouts/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" />
          New Workout
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{workout.name}</h2>
            <p className="text-gray-600 mb-4">
              Scheduled: {format(new Date(workout.scheduledAt), 'PPpp')}
            </p>
            <h3 className="font-medium mb-2">Exercises:</h3>
            <ul className="list-disc list-inside">
              {workout.workoutExercises.map((exercise, index) => (
                <li key={index}>
                  {exercise.exercise.name} - {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight}kg
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}