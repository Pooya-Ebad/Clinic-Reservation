import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function SwaggerConfig(app : INestApplication) : void{
    const document = new DocumentBuilder()
    .setTitle("Clinic reservation")
    .setDescription("back-end of Clinic reservation")
    .setVersion("0.0.1")
    .addBearerAuth(swaggerAuthConfig(), "authorization")
    .build()
    const swaggerDocument = SwaggerModule.createDocument(app , document)
    SwaggerModule.setup("/swagger" , app , swaggerDocument)

}
function swaggerAuthConfig() : SecuritySchemeObject {
    return{
        type : "http",
        bearerFormat : "JWT",
        in : "header",
        scheme : "bearer",
        
    }
}