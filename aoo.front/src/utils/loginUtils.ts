import Cookies from 'js-cookie';

export function getToken(): string | undefined {
  return Cookies.get('jwt_token');
}
