import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './database/prisma.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [PrismaModule, PhoneModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
