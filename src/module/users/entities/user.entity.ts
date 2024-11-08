import { EntityName } from "src/common/enums/entities.enum";
import { role } from "src/common/enums/role.enum";
import { OtpEntity } from "src/module/auth/entity/otp.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity(EntityName.User)
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id : number
    @Column()
    first_name : string
    @Column()
    last_name : string
    @Column({unique : true})
    mobile : string
    @Column({default : false})
    mobile_verify : boolean
    @Column({default : role.USER})
    role : string
    @CreateDateColumn()
    created_at : Date
    @UpdateDateColumn()
    updated_at : Date
    @Column({nullable : true})
    otpId : number
    @OneToOne(() => OtpEntity, otp => otp.user)
    @JoinColumn()
    otp : OtpEntity
}