import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectCardModule } from 'src/object-cards/object-cards.module';
import { ObjectCategory } from 'src/models/object-category.model';
import { ObjectLevel } from 'src/models/object-level.model';
import { FileUploadService } from 'src/utils/file-upload.service';
import { HttpModule } from '@nestjs/axios';

import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';
import { FinancialLesson } from 'src/models/financial-lesson.model';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    SequelizeModule.forFeature([User, ObjectCategory, ObjectLevel, UserFinancialLessons, FinancialLesson ]),
    UsersModule,
    passportModule,
    ObjectCardModule,
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule,
  ],
  providers: [AuthService, UsersService, FileUploadService, JwtStrategy],
  controllers: [AuthController],
  exports: [passportModule],
})
export class AuthModule {}
