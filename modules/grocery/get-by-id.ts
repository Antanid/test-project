import { API_URL } from '@/constants'
import { Grocery } from '@/modules/grocery/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGroceryById = (id: string | undefined) =>
  useQuery<Grocery, Error>({
    queryKey: ['grocery', id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/groceries/${id}`)
      return response.data
    },
    enabled: !!id,
  })
