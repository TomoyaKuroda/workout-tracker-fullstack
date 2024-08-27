'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import WorkoutForm from '@/components/WorkoutForm'
import { Exercise } from '@prisma/client'

export default function NewWorkout() {
  const { data: session } = useSession()
  const router = useRouter()
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    fetch('/api/exercises')
      .then((res) => res.json())
      .then((data) => setExercises(data))
  }, [])

  const handleSubmit = async (data: any) => {
    if (session) {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/workouts')
      } else {
        console.error('Failed to create workout')
      }
    }
  }

  if (!session) {
    return <div>Please sign in to create a workout.</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Workout</h1>
      <WorkoutForm exercises={exercises} onSubmit={handleSubmit} />
    </div>
  )
}