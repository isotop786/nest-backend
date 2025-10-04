import { BadRequestException, Body, ConflictException, Controller, InternalServerErrorException, NotFoundException, Post, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';


@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    // User Registration
    @Post('register')
    async register(@Body() body: RegisterDto) {

        try {
            if (body.password !== body.password_confirm) {
                throw new BadRequestException("Passwords did not matched")
            }

            const saltOrRounds = 12;
            const { password } = body;
            const hash = await bcrypt.hash(password, saltOrRounds);
            return this.userService.create({ ...body, password: hash });
        }
        catch (error) {

            if (error.code === '23505') {
                throw new ConflictException('Email already exists');
            }
            if (error instanceof BadRequestException) {
                throw error;
            }



            throw new InternalServerErrorException(error.message || 'Something went wrong');
        }
    }

    // Login
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = this.userService.findOneOrFail({ email })


        if (!user) {
            throw new NotFoundException("User not found")
        }

        // chcking the password
        if (!await bcrypt.compare(password, (await user).password)) {
            throw new BadRequestException("Invalid credentials")
        }
        const jwt = await this.jwtService.signAsync({id: (await user).id});

        // set cookie

        response.cookie('jwt', jwt, { httpOnly: true })

        return user;
    }
}
