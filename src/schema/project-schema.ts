export interface Project {
  id: string
  name: string
  client: string
  startDate: Date
  endDate: Date
  banner?: string
  isFavorite: boolean
}
