import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { WALLET_SERVICE_PACKAGE_NAME } from './protobuf/interface-ts/wallet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: WALLET_SERVICE_PACKAGE_NAME,
      protoPath: join(process.cwd(), 'src/protobuf/wallet.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}

bootstrap();
