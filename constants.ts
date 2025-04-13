import { isIOS } from '@/core/device'

export const API_URL = isIOS ? 'http://localhost:3001' : 'http://10.0.2.2:3001'
