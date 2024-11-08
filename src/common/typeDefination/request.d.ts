import { TokenPayload } from "../types/payload";

declare global {
    namespace Express {
        interface Request {
           user : TokenPayload
       }
    }
}