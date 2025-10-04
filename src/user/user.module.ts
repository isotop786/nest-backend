import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './models/user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports:[
    TypeOrmModule.forFeature([Users])
  ],
  providers: [UserService],
  exports:[
    UserService
  ]
})
export class UserModule {}
