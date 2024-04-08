import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './database/prisma.module';
import { PhoneModule } from './phone/phone.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [PrismaModule, PhoneModule, UserModule, AuthModule, MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
