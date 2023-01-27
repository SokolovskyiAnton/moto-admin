import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import { isExpiredJWTToken } from 'src/helpers/jwtUtils';
import {Cookies} from 'quasar';


export const checkTokenExpiry = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = Cookies.get('jwt')
  const requireAuth = to.matched.some(m => m.meta.auth)

  if (requireAuth) {
    if (token) {
      const isExpired = isExpiredJWTToken(token)
      if (isExpired) {
        Cookies.remove('jwt')
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
