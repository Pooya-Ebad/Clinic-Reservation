import { Body, Controller, Get, Global, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckOtpDto, CreateOtpDto, RefreshTokenDto, RoleDto, SendOtpDto } from "./dto/auth.dto";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { SwaggerEnums } from "src/common/enums/swagger.enum";
import { AuthGuard } from "./guard/auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller('auth')
@UsePipes(ValidationPipe)
@ApiBearerAuth("Authorization")
export class AuthController {
    constructor(private readonly authService : AuthService) {}
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    @Post("signup")
    signup(@Body() otpDto : CreateOtpDto) {
        return this.authService.signup(otpDto)
    }
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    @Post("login")
    login(@Body() otpDto : SendOtpDto) {
        return this.authService.sendOtp(otpDto)
    }
    @Post("check-otp")
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    checkOtp(@Body() otpDto : CheckOtpDto) {
        return this.authService.checkOtp(otpDto)
    }
    @Post("refreshToken")
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    refreshToken(@Body() refreshTokenDto : RefreshTokenDto) {
        return this.authService.verifyRefreshToken(refreshTokenDto)
    }
    @Roles(["admin"])
    @UseGuards(AuthGuard)
    @Patch("set-admin")
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    setAdmin(@Body() role : RoleDto){
        return this.authService.setAdmin(role)
    }
} 