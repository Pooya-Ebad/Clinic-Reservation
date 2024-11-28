import 'express';
import { TokenPayload } from '../types/payload';

declare module 'express' {
  export interface Request {
    user?: TokenPayload
  }
}