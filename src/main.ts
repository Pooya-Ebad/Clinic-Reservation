import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app)
  const {PORT} = process.env
  await app.listen(PORT, ()=>{
    console.log(`server run on http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
