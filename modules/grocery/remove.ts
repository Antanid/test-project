import { API_URL } from '@/constants'
import { showToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/groceries/${id}`)
    },
    onSuccess: () => {
      showToast({
        type: 'success',
        text1: 'The item was removed from your grocery list.',
      })
    },
    onError: error => {
      showToast({
        type: 'error',
        text1: 'Failed to remove the grocery item.',
        text2: error.message,
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['groceries'] })
    },
  })
}
