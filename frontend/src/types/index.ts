export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface ApiError {
  message: string;
  status: number;
}
