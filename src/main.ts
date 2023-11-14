import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { undefinedToNullInterceptor } from './interceptors/undefinedToNull.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API 문서 제목')
    .setDescription('API 문서 설명')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs'는 swagger문서로 접속할 url을 말한다.
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new undefinedToNullInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
