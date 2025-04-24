import { jwtDecode } from "jwt-decode";

export interface IDecodedToken {
  sub: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

export const DecodeToken = (accessToken: string) => {
  try {
    const decoded: IDecodedToken = jwtDecode(accessToken);

    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      accessToken,
    };
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
