import React from 'react'
import Header from './Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; 2023 Workout Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout