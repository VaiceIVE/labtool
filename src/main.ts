import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);




  app.enableCors({
    credentials: true,
    origin:[
      "http://localhost:3000",
      "http://localhost:3000/",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3000/",
    ]
  })
  await app.listen(8000);
}
bootstrap();
