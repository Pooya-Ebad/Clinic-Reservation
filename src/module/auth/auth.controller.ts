import { Body, Controller, Global, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckOtpDto, RoleDto, SendOtpDto } from "./dto/auth.dto";
import { ApiConsumes } from "@nestjs/swagger";
import { SwaggerEnums } from "src/common/enums/swagger.enum";
import { AuthGuard } from "./guard/auth.guard";

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
    constructor(private readonly authService : AuthService) {}
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    @Post("send-otp")
    sendOtp(@Body() otpDto : SendOtpDto) {
        return this.authService.sendOtp(otpDto)
    }
    @Post("check-otp")
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    checkOtp(@Body() otpDto : CheckOtpDto) {
        return this.authService.checkOtp(otpDto)
    }
    @UseGuards(AuthGuard)
    @Patch("set-admin")
    @ApiConsumes(SwaggerEnums.UrlEncoded)
    setAdmin(@Body() role : RoleDto){
        return this.authService.setAdmin(role)
    }
} 