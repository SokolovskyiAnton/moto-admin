import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import { isExpiredJWTToken } from 'src/helpers/jwtUtils';


export const checkTokenExpiry = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = localStorage.getItem('token')
  const requireAuth = to.matched.some(m => m.meta.auth)

  if (requireAuth) {
    if (token) {
      const isExpired = isExpiredJWTToken(token)
      if (isExpired) {
        localStorage.removeItem('token')
        next({ path: '/login' })
        return
      }
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
}
