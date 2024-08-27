import Link from 'next/link'
import { FaDumbbell } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to <span className="text-blue-600">Workout Tracker</span>
        </h1>
        <p className="text-xl mb-8">
          Track your workouts, set goals, and achieve your fitness dreams!
        </p>
        <div className="flex space-x-4">
          <Link
            href="/workouts"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaDumbbell className="mr-2" />
            View Workouts
          </Link>
          <Link
            href="/workouts/new"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Workout
          </Link>
        </div>
      </main>
    </div>
  )
}