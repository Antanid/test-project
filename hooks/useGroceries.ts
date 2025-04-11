import { isIOS } from '@/core/device'
import { showToast } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = isIOS ? 'http://localhost:3001' : 'http://10.0.2.2:3001'

export type Grocery = {
  id: string
  title: string
  price: string
  completed: boolean
}

// Fetch groceries from the server
const fetchGroceries = async (): Promise<Grocery[]> => {
  const response = await axios.get(`${BASE_URL}/groceries`)
  return response.data
}

// Custom hook to fetch groceries data using React Query
export const useGroceries = () =>
  useQuery({
    queryKey: ['groceries'],
    queryFn: fetchGroceries,
  })

// Custom hook to update grocery item completion status
export const useUpdateGroceryCompleted = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      await axios.patch(`${BASE_URL}/groceries/${id}`, { completed })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
  })
}

// Custom hook to delete a grocery item
export const useDeleteGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${BASE_URL}/groceries/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
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
  })
}

// Custom hook to add a new grocery item
export const useAddGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newGrocery: Grocery) => {
      await axios.post(`${BASE_URL}/groceries`, newGrocery)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
      showToast({
        type: 'success',
        text1: 'The item was added to your grocery list.',
      })
    },
    onError: error => {
      showToast({
        type: 'error',
        text1: 'Failed to add the grocery item.',
        text2: error.message,
      })
    },
  })
}

// Custom hook to update an existing grocery item
export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updatedData }: { id: string; updatedData: Partial<Grocery> }) => {
      await axios.patch(`${BASE_URL}/groceries/${id}`, updatedData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
      showToast({
        type: 'success',
        text1: 'The grocery item was updated.',
      })
    },
    onError: error => {
      showToast({
        type: 'error',
        text1: 'Failed to update the grocery item.',
        text2: error.message,
      })
    },
  })
}

export const useGroceryById = (id: string | undefined) =>
  useQuery<Grocery, Error>({
    queryKey: ['grocery', id],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/groceries/${id}`)
      return response.data
    },
    enabled: !!id,
  })
