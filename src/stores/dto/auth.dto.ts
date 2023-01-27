export interface AuthDto {
  first_name: string,
  last_name: string,
  email: string,
  is_admin: boolean
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthState {
  user: AuthDto | null;
}
