import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// Выбираем только те поля, которые хотим включить в DTO для обновления
class PartialCreateUserDto extends PickType(CreateUserDto, [
  'name',
  'surname',
  'email',
  'password',
  'AccountImg',
] as const) {}

// Делаем все выбранные поля необязательными
export class UpdateUserDto extends PartialType(PartialCreateUserDto) {}
