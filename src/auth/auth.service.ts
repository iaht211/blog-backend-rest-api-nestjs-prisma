//src/auth/auth.service.ts
import {
    Injectable,
    NotFoundException,
    Response,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { UsersService } from 'src/users/users.service';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private usersService: UsersService,
        private configService: ConfigService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid === true) {
                //const userRole = user.role as unknown as { _id: string, name: string }
                //const temp = await this.rolesService.findOne(userRole._id);
                //console.log(temp)
                //  const objUser = {
                //      ...user.toObject(),
                //    permissions: temp?.permissions ?? []
                //}
                return user;
            }
        }
        return null;

    }

    async login(email: string, password: string, @Response() response,) {
        // Step 1: Fetch a user with the given email
        const user = await this.usersService.findOneByUsername(email);

        // If no user is found, throw an error
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        // Step 2: Check if the password is correct
        const isPasswordValid = await this.usersService.isValidPassword(password, user.password);

        // If password does not match, throw an error
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        let { id, name } = user;
        const payload = {
            sub: "token login ",
            iss: "from server",
            id, name, email
        };

        const refresh_token = this.createRefreshToken(payload)
        //update user with refresh token 
        await this.usersService.updateUserToken(refresh_token, +id)
        //set refresh token cookie
        // http Only là chỉ có server mới có thể xem được
        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
        })
        // Step 3: Generate a JWT containing the user's ID and return it
        return {
            accessToken: this.jwtService.sign({ payload }),
            refreshToken: refresh_token,
            user: {
                id, name, email
            }

        };
    }

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
        })
        return refresh_token
    }
}