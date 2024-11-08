import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomInt} from "crypto";
import { CheckOtpDto, RoleDto, SendOtpDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { OtpEntity } from "./entity/otp.entity";
import { UserEntity } from "../users/entities/user.entity";
import { TokenPayload } from "src/common/types/payload";
import { DoctorEntity } from "../doctors/entities/doctor.entity";
import { Request } from "express";
import { ClientRequest, request } from "http";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepository : Repository<OtpEntity>,
        @InjectRepository(DoctorEntity) private docRepository : Repository<DoctorEntity>,
        private jwtService : JwtService
    ){}
    private async createOtp(user : UserEntity){
        let otp = await this.otpRepository.findOneBy({userId : user.id})
        let code = randomInt(10000 , 99999).toString()
        let expiration = new Date(new Date().getTime() + (1000*60 *2) )
        if(otp){
            if(otp.expires_in > new Date(new Date().getTime())){
                throw new NotFoundException("otp code not expired")
            }
            otp.code = code,
            otp.expires_in = expiration
        } else {
            otp = this.otpRepository.create({
                    code,
                    expires_in : expiration,
                    userId : user.id
                }
            )
        }
        otp = await this.otpRepository.save(otp)
        user.otpId = otp.id
        await this.userRepository.save(user)
        
    }
    async sendOtp(OtpDto : SendOtpDto){
        const {mobile, first_name, last_name} = OtpDto
        let user = await this.userRepository.findOneBy({mobile})
        if(!user){
            user = this.userRepository.create({
                first_name,
                last_name,    
                mobile,
            })
            user = await this.userRepository.save(user)
        }
        await this.createOtp(user)
        return {
            message : "code sent"
        }
    }
    async checkOtp(otpDto : CheckOtpDto){
        const { mobile , code } = otpDto
        const user = await this.userRepository.findOne({
            where : {mobile},
            relations : {
                otp : true
            }
        })
        const now = new Date()
        if(user?.otp?.expires_in < now){
            throw new UnauthorizedException("code is expired")
        }
        if(!user || !user?.otp){
            throw new UnauthorizedException("user Not Found")
        }
        if(user?.otp?.code !== code){
            throw new UnauthorizedException("code is not correct")
        }
        if(!user?.mobile_verify){
            await this.userRepository.update({id : user.id}, {
                mobile_verify : true
            })
        }
        const { accessToken , refreshToken } = this.TokenGenerator({
            id : user.id , first_name : user.first_name, last_name : user.last_name, mobile : user.mobile, role : user.role
        })
        return {
            accessToken,
            refreshToken,
            message : "you logged in successfully"
        }
    }
    TokenGenerator(payload : TokenPayload){
        const accessToken = this.jwtService.sign(payload,{
            secret : process.env.ACCESS_TOKEN_SECRET,
            expiresIn : "30d"
        })
        const refreshToken = this.jwtService.sign(payload,{
            secret : process.env.REFRESH_TOKEN_SECRET,
            expiresIn : "1y"
        })
        return {
            accessToken,
            refreshToken
        }
    }
    async validateAccessToken(token : string){
        try {
            const payload = this.jwtService.verify<TokenPayload>(token,{secret : process.env.ACCESS_TOKEN_SECRET}) 
            if(typeof payload == "object" && payload?.id){
                const user = await this.userRepository.findOneBy({id : payload.id})
                if(!user){
                    throw new UnauthorizedException("login to your account")
                }
                return payload
            }
            throw new UnauthorizedException("login to your account")
        } catch (error) {
            throw new UnauthorizedException(error)
        }
        
    }
    async setAdmin(roleData : RoleDto){
        const { role, mobile } = roleData
        const user = await this.userRepository.findOneBy({mobile})
        const doc = await this.docRepository.findOneBy({mobile})
        if(user){
            user.role = role
            await this.userRepository.save(user)
            return {
                message : `user ${user.first_name} ${user.last_name} with mobile : ${user.mobile} is now ${role}`
            }
        }
        if(doc){
            doc.role = role
            await this.docRepository.save(doc)
            return {
                message : `user ${doc.first_name} ${doc.last_name} with mobile : ${doc.mobile} is now ${role}`
            }
        }
 


    }

}