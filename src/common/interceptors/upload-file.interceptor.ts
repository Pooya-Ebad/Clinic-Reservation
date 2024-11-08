import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

export function UploadFileS3(fieldName : string){
    return class UploadUtility extends FileInterceptor(fieldName, {
        storage : memoryStorage()
    }){}
}