import jwtDecode from 'jwt-decode'
export interface DecodedPayload {
  sub: string
  exp: number
  tenantCode: string
  scope: string[]
}

export const isExpiredJWTToken = (accessToken: string) => {
  try {
    const decoded: DecodedPayload = jwtDecode(accessToken)
    return Date.now() / 1000 >= decoded.exp
  } catch {
    return true
  }
}

