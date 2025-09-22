// //src/app/
// import { jwtDecode } from "jwt-decode";

// // Struktur payload user di token
// export type UserPayload = {
//   id: string;
//   name?: string;
//   email: string;
//   role: string;
//   phonenumber: string;
//   iat?: number; // issued at
//   exp?: number; // expired at
// };

// export function decodeToken(token: string): UserPayload | null {
//   try {
//     return jwtDecode<UserPayload>(token);
//   } catch (err) {
//     console.error("Failed to decode token:", err);
//     return null;
//   }
// }
