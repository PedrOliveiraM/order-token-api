import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Order Token API')
    .setDescription('This is the Order Token API, which is used to manage order')
    .setContact('Pedro Monteiro', 'http://localhost.com', 'pedro.oliveira@monteirodev.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(env.PORT);
}
bootstrap();
