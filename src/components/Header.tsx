'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FaDumbbell } from 'react-icons/fa'

const Header: React.FC = () => {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <FaDumbbell className="mr-2" />
          Workout Tracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/workouts" className="hover:text-gray-300">
                    Workouts
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut()} className="hover:text-gray-300">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => signIn()} className="hover:text-gray-300">
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header