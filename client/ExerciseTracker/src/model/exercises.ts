import data from '../data/exercisePosts.json'
import type { User } from './users'

export interface ExercisePost {
  id?: number
  author: User
  timestamp: Date
  location: string
  caption: string
  imageURL: string
  distance: number
  duration: Time
}

