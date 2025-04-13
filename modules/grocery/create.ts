import { API_URL } from '@/constants'
import { Grocery } from '@/modules/grocery/types'
import { showToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useAddGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newGrocery: Grocery) => {
      await axios.post(`${API_URL}/groceries`, newGrocery)
    },

    onError: error => {
      showToast({
        type: 'error',
        text1: 'Failed to add the grocery item.',
        text2: error.message,
      })
    },

    onSuccess: () => {
      showToast({
        type: 'success',
        text1: 'The item was added to your grocery list.',
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
  })
}
