import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Exercise } from '@prisma/client'

const workoutSchema = z.object({
  name: z.string().min(1, 'Workout name is required'),
  scheduledAt: z.string().min(1, 'Scheduled date is required'),
  exercises: z.array(
    z.object({
      id: z.string().min(1, 'Exercise is required'),
      sets: z.number().min(1, 'Sets must be at least 1'),
      reps: z.number().min(1, 'Reps must be at least 1'),
      weight: z.number().min(0, 'Weight must be non-negative'),
      comments: z.string().optional(),
    })
  ).min(1, 'At least one exercise is required'),
})

type WorkoutFormData = z.infer<typeof workoutSchema>

interface WorkoutFormProps {
  exercises: Exercise[]
  onSubmit: (data: WorkoutFormData) => void
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ exercises, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      exercises: [{ id: '', sets: 1, reps: 1, weight: 0, comments: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Workout Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
          Scheduled Date
        </label>
        <input
          type="datetime-local"
          id="scheduledAt"
          {...register('scheduledAt')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.scheduledAt && <p className="mt-1 text-sm text-red-600">{errors.scheduledAt.message}</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700">Exercises</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="mt-4 space-y-2">
            <select
              {...register(`exercises.${index}.id`)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
            {errors.exercises?.[index]?.id && (
              <p className="mt-1 text-sm text-red-600">{errors.exercises[index]?.id?.message}</p>
            )}

            <div className="flex space-x-2">
              <div>
                <label htmlFor={`exercises.${index}.sets`} className="block text-sm font-medium text-gray-700">
                  Sets
                </label>
                <input
                  type="number"
                  {...register(`exercises.${index}.sets`, { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.exercises?.[index]?.sets && (
                  <p className="mt-1 text-sm text-red-600">{errors.exercises[index]?.sets?.message}</p>
                )}
              </div>
              <div>
                <label htmlFor={`exercises.${index}.reps`} className="block text-sm font-medium text-gray-700">
                  Reps
                </label>
                <input
                  type="number"
                  {...register(`exercises.${index}.reps`, { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.exercises?.[index]?.reps && (
                  <p className="mt-1 text-sm text-red-600">{errors.exercises[index]?.reps?.message}</p>
                )}
              </div>
              <div>
                <label htmlFor={`exercises.${index}.weight`} className="block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register(`exercises.${index}.weight`, { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.exercises?.[index]?.weight && (
                  <p className="mt-1 text-sm text-red-600">{errors.exercises[index]?.weight?.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor={`exercises.${index}.comments`} className="block text-sm font-medium text-gray-700">
                Comments
              </label>
              <textarea
                {...register(`exercises.${index}.comments`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 rounded-md bg-red-100 px-2 py-1 text-sm text-red-600 hover:bg-red-200"
            >
              Remove Exercise
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ id: '', sets: 1, reps: 1, weight: 0, comments: '' })}
          className="mt-4 rounded-md bg-indigo-100 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-200"
        >
          Add Exercise
        </button>
      </div>

      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create Workout
      </button>
    </form>
  )
}

export default WorkoutForm