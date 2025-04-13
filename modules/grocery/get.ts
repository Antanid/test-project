import { API_URL } from '@/constants'
import { Grocery } from '@/modules/grocery/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const PAGE_SIZE = 5
// Fetch groceries from the server
const fetchGroceries = async ({
  pageParam,
  limit,
}: {
  pageParam: number
  limit: number
}): Promise<Grocery[]> => {
  // Add delay only when fetching next pages to ensure loader is visible
  if (pageParam > 1) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  const response = await axios.get(`${API_URL}/groceries?_limit=${limit}&_page=${pageParam}`)
  return response.data
}

// Hook to fetch groceries data using React Query
export const useGroceries = (limit = PAGE_SIZE) => {
  return useInfiniteQuery({
    queryKey: ['groceries'],
    queryFn: ({ pageParam }: { pageParam: number }) => fetchGroceries({ pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === PAGE_SIZE) {
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
