import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "src/common/decorators/roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private authService : AuthService,
        private reflector: Reflector
    ){}
    async canActivate(
        context: ExecutionContext
    ) {
        const httpRequest = context.switchToHttp()
        const request : Request = httpRequest.getRequest<Request>()
        const token = this.extractToken(request)
        request.user = await this.authService.validateAccessToken(token)
        const requiredRole : string[] = this.reflector.get(ROLE_KEY, context.getHandler());
        if(requiredRole && requiredRole.length>0){
            const userRole = await this.authService.checkUserRole(request.user.mobile)
            if(requiredRole.includes(userRole.toString())){
                    return true
            }
                throw new UnauthorizedException("access denied")
        }
        return true
    }
    protected extractToken(request : Request){
        const { authorization } = request.headers
        if(!authorization ||  authorization?.trim() == "") 
            throw new UnauthorizedException("login to your account")
        const [ bearer , token ] = authorization?.split(" ")
        if(bearer.toLowerCase() !== "bearer" || !token || !isJWT(token))
            throw new UnauthorizedException("login to your account")        
        return token
    }

}
