import { API_URL } from '@/constants'
import { Grocery } from '@/modules/grocery/types'
import { showToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateGroceryCompleted = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      await axios.patch(`${API_URL}/groceries/${id}`, { completed })
    },
    // Optimistically update the cache before the mutation happens
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['groceries'] })

      const previousData = queryClient.getQueryData<{ pages: Array<Array<Grocery>> }>(['groceries'])
      if (!previousData) return

      queryClient.setQueryData<{ pages: Array<Array<Grocery>> }>(['groceries'], {
        ...previousData,
        pages: previousData.pages.map(groceries => {
          return groceries.map(grocery => (grocery.id === id ? { ...grocery, completed } : grocery))
        }),
      })

      return { previousData }
    },

    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groceries'], context.previousData)
      }
      showToast({
        type: 'error',
        text1: 'Failed to update the grocery item.',
        text2: error.message,
      })
    },
    onSuccess: () => {
      showToast({
        type: 'success',
        text1: 'The grocery item was updated.',
      })
    },
  })
}
export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updatedData }: { id: string; updatedData: Partial<Grocery> }) => {
      await axios.patch(`${API_URL}/groceries/${id}`, updatedData)
    },

    // Optimistically update the cache before the mutation happens
    onMutate: async ({ id, updatedData }) => {
      await queryClient.cancelQueries({ queryKey: ['groceries'] })

      const previousData = queryClient.getQueryData<{ pages: Array<Array<Grocery>> }>(['groceries'])
      if (!previousData) return

      queryClient.setQueryData<{ pages: Array<Array<Grocery>> }>(['groceries'], {
        ...previousData,
        pages: previousData.pages.map(groceries => {
          return groceries.map(grocery =>
            grocery.id === id ? { ...grocery, ...updatedData } : grocery,
          )
        }),
      })

      return { previousData }
    },

    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groceries'], context.previousData)
      }
      showToast({
        type: 'error',
        text1: 'Failed to update the grocery item.',
        text2: error.message,
      })
    },

    onSuccess: () => {
      showToast({
        type: 'success',
        text1: 'The grocery item was updated.',
      })
    },

    // After mutation, refetch to sync with the server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
  })
}
