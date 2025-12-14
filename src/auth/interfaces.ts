export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  login: string;
}
