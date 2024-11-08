import { EntityName } from "src/common/enums/entities.enum";
import { DoctorEntity } from "src/module/doctors/entities/doctor.entity";
import { UserEntity } from "src/module/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(EntityName.OTP)
export class OtpEntity {
    @PrimaryGeneratedColumn("increment")
    id : number
    @Column({nullable : true})
    code : string
    @Column({nullable : true})
    expires_in : Date
    @Column()
    userId : number
    @OneToOne(() => UserEntity, user => user.otp, {onDelete : "CASCADE"})
    user : UserEntity
}  