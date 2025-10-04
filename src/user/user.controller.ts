import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './models/user.entity';

@Controller('users')
export class UserController {

    constructor(
        private userService : UserService
    ){}

    @Get()
    async all() : Promise<Users[]> {
        return await this.userService.all();
    }
}
