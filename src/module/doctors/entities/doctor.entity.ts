import { EntityName } from "src/common/enums/entities.enum";
import { OtpEntity } from "src/module/auth/entity/otp.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity(EntityName.Doc)
export class DoctorEntity {
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
    @Column()
    category : string
    @Column({unique : true})
    Medical_License_number : string
    @Column({unique : true})
    national_code : string
    @Column()
    description : string
    @Column({default : "user"})
    role : string
    @CreateDateColumn()
    created_at : Date
    @UpdateDateColumn()
    updated_at : Date
    @Column()
    image : string
}
