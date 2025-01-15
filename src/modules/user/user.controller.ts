import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Controller('user')
export class UserController {
    constructor(private repository: UserRepository) { }

    @Post('create')
    async createUser(@Body() data: any) {
        try {

            const hashPassword = await bcrypt.hash(data.password, 10)
            const formatedPassword = { ...data, password: hashPassword }
            const novoUsuario = await this.repository.createUser(formatedPassword);
            const { password, ...rest } = novoUsuario

            return {
                data: rest,
                message: 'User created successfully',
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error creating user',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    }

    @Post('login')
    async userLogin(@Body() data: any) {

        try {

            const user = await this.repository.userLogin(data);

            if (!user) {
                throw new Error('User not found');
            }

            const verifyPass = await bcrypt.compare(data.password, user.password);

            if (!verifyPass) {
                throw new Error('Invalid password or email')
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '24h' });
            const { password: _, ...userLogin } = user;

            return {
                data: userLogin,
                message: 'User logged in successfully',
                token: token,
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error logging in user',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }

    }
}
