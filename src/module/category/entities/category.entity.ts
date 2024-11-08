import { EntityName } from "src/common/enums/entities.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity(EntityName.Categories)
export class CategoryEntity {
    @PrimaryGeneratedColumn("increment")
    id : number
    @Column()
    title : string
    @Column({unique : true})
    slug : string
    @Column()
    image : string
    @Column()
    description : string
    @Column({default : true})
    show : boolean
    @Column({nullable : true})
    parentId : number
    @ManyToOne(()=> CategoryEntity , category => category.children)
    parent : CategoryEntity
    @OneToMany(()=> CategoryEntity , category => category.parent)
    children : CategoryEntity[]
}
