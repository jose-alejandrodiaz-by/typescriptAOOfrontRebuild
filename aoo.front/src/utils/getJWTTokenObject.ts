import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

// Define the type for the decoded token (you can adjust this based on the actual structure of your token)
interface DecodedToken {
  exp: number;
  // Add other properties as needed
}

export const getJWTTokenObject = (): DecodedToken | '0' => {
  const token = Cookies.get('jwt_token');
  if (token) {
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken;
  }
  return '0';
};
