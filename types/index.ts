export interface User {
  id: string
  email?: string
  created_at?: string
}

export interface Session {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: User
}

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

export interface OcrResult {
  id: string
  user_id: string
  original_filename: string
  image_url?: string
  extracted_text: string
  confidence: number
  created_at: string
}

export interface OcrApiResponse {
  ParsedResults: Array<{
    ParsedText: string
    TextOverlay?: {
      HasOverlay: boolean
    }
  }>
  IsErroredOnProcessing: boolean
  ErrorMessage?: string
}