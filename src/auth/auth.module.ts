import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';



@Module({
  controllers: [AuthController],
  imports:[
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret || "lsdfjsofiikelfjlskdf",
      signOptions: { expiresIn: '60s' },
    }),
  ]
})
export class AuthModule {}
