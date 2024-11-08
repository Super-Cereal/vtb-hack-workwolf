import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectCardModule } from 'src/object-cards/object-cards.module';
import { ObjectCategory } from 'src/models/object-category.model';
import { ObjectLevel } from 'src/models/object-level.model';
import { FileUploadService } from 'src/utils/file-upload.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, ObjectCategory, ObjectLevel, ]),
    UsersModule,
    PassportModule,
    ObjectCardModule,
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, JwtService, FileUploadService],
  controllers: [AuthController],
})
export class AuthModule {}
