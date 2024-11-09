import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WorkWolf VTB hakaton API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.enableCors({
  //   origin: 'http://your-frontend-domain.com', // Allow requests from this domain
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  //   allowedHeaders: 'Content-Type, Authorization', // Allow these headers
  //   credentials: true, // Allow credentials (cookies, HTTP authentication)
  // });

  await app.listen(3000);
}
bootstrap();
