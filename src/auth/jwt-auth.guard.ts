//src/auth/jwt-auth.guard.ts
import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {

            return true
        }
        return super.canActivate(context);

    }

    handleRequest(err, user, info, context: ExecutionContext) {

        const request: Request = context.switchToHttp().getRequest();

        if (err || !user) {
            throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Brearer Token ở Header request");
        }
        return user;
    }

}