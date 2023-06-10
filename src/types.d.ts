export interface UserData {
  user: string
  role: string
  profile: string
  email: string
  phone: string
  linkedIn: string
  github: string
}

export interface WorkExperience {
  company: string
  from: string
  to: string
  jobRole: string
  description: string
}

export interface OfferData {
  title: string
  imgUrl: string
  description: string
  skillsList: array
}

export type Languages = 'Ingles' | 'Español' | 'Chino' | 'Portugués' | 'Alemán' | 'Francés' | 'Italiano' | ''
