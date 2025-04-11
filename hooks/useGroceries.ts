import { isIOS } from '@/core/device'
import { showToast } from '@/utils/toast'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = isIOS ? 'http://localhost:3001' : 'http://10.0.2.2:3001'

export type Grocery = {
  id: string
  title: string
  price: string
  completed: boolean
}

// Fetch groceries from the server
const fetchGroceries = async ({ pageParam }: { pageParam: number }): Promise<Grocery[]> => {
  const response = await axios.get(`${API_URL}/groceries?_limit=10&_page=${pageParam}`)
  return response.data
}

// Hook to fetch groceries data using React Query
export const useGroceries = () => {
  return useInfiniteQuery({
    queryKey: ['groceries'],
    queryFn: fetchGroceries,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 10) {
        return pages.length + 1
      }
      return undefined
    },
    select: data => {
      const allGroceries = data.pages.flat()
      return { ...data, pages: allGroceries }
    },
  })
}

// Hook to update grocery item completion status
export const useUpdateGroceryCompleted = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      await axios.patch(`${API_URL}/groceries/${id}`, { completed })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
  })
}

// Hook to delete a grocery item
export const useDeleteGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/groceries/${id}`)
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

// Hook to add a new grocery item
export const useAddGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newGrocery: Grocery) => {
      await axios.post(`${API_URL}/groceries`, newGrocery)
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

// Hook to update an existing grocery item
export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updatedData }: { id: string; updatedData: Partial<Grocery> }) => {
      await axios.patch(`${API_URL}/groceries/${id}`, updatedData)
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
      const response = await axios.get(`${API_URL}/groceries/${id}`)
      return response.data
    },
    enabled: !!id,
  })
