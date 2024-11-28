import { PartialType } from '@nestjs/swagger';
import { CreateUserDto, FindUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
