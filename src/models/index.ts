export interface RegisterForm {
  email: string // User's email address
  password: string // User's password
  confirm_password: string // Confirmation of the user's password
  first_name: string // User's first name
  last_name: string // User's last name
}

export interface LoginForm {
  email: string // User's email address
  password: string // User's password
  remember?: Boolean // Whether to remember the user (for login)
}

export interface User {
  id: string // User's unique identifier
  salutation: salutation // User's salutation (e.g., Mr., Ms.)
  first_name: string // User's first name
  last_name: string // User's last name
  email: string // User's email address
  created_at: string // Date when the user was created
  updated_at?: string // Date when the user was last updated
  //   avatar: string // URL to the user's avatar image
  is_active: Boolean // Indicates if the user account is active
  additional_info?: additional_info // Additional information about the user
  spouse_info?: spouse_info // Spouse information of the user
  personal_pref?: personal_pref // Personal information of the user
  avatar?: File // URL to the user's avatar image
}
export enum gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum marital_status {
  Single = 'single',
  Married = 'married',
  Divorced = 'divorced',
  Widowed = 'widowed',
  Separated = 'separated',
}

export enum salutation {
  Mr = 'Mr',
  Ms = 'Ms',
  Mrs = 'Mrs',
}

interface additional_info {
  address: string // User's address
  country: string // User's country
  postal_code: string // User's postal code
  date_of_birth: string // User's date of birth
  gender: gender // User's gender (e.g Male, Female, Other)
  marital_status: marital_status // User's marital status (e.g., Single, Married)
}

interface spouse_info {
  salutation: salutation // User's salutation (e.g., Mr., Ms.)
  first_name: string // User's first name
  last_name: string // User's last name
}

interface personal_pref {
  hobbies: '' // User's hobbies
  sports: '' // User's favorite sports
  music: '' // User's favorite music
  movies: '' // User's favorite movies
}

export interface updateForm {
  salutation: salutation // User's salutation (e.g., Mr., Ms.)
  first_name: string // User's first name
  last_name: string // User's last name
  email: string // User's email address
  additional_info: additional_info // Additional information about the user
  spouse_info: spouse_info // Spouse information of the user
  personal_pref: personal_pref // Personal information of the user
  avatar?: File | null // URL to the user's avatar image
  section?: 'basic_details' | 'additional_info' | 'spouse_detail' | 'personal_pref' // Section to update
  avatar_url?: string // URL to the user's avatar image
}
