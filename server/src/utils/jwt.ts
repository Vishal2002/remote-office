import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const createToken = (userId: string,userType:string): string => {
  return jwt.sign({ userId,userType }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};