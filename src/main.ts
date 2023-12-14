import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { undefinedToNullInterceptor } from './interceptors/undefinedToNull.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API 문서 제목')
    .setDescription('API 문서 설명')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  // upload 디렉토리의 경로 설정
  const uploadDir = path.resolve(__dirname, 'upload');

  // 애플리케이션이 시작할 때 upload 디렉토리가 있는지 확인하고, 없다면 생성
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs'는 swagger문서로 접속할 url을 말한다.
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new undefinedToNullInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
