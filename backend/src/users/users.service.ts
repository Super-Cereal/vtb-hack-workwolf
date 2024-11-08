import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectCategory, ObjectCategoryEnum } from '../models/object-category.model';
import { ObjectLevel } from '../models/object-level.model';
import { ObjectCardsService } from 'src/object-cards/object-cards.service';
import { FileUploadService } from 'src/utils/file-upload.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private objectCardsService: ObjectCardsService,
    @InjectModel(ObjectCategory)
    private objectCategoryModel: typeof ObjectCategory,
    @InjectModel(ObjectLevel)
    private objectLevelModel: typeof ObjectLevel,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async createUser(createUserDto: CreateUserDto, avatarFile?: Express.Multer.File): Promise<User> {
    let AccountImg = null;
    if (avatarFile) {
      AccountImg = await this.fileUploadService.uploadFile(avatarFile);
    }

    const user = await this.userModel.create({
      ...createUserDto,
      AccountImg,
    });

    // Создаем карточки для каждой категории
    for (const category of Object.values(ObjectCategoryEnum)) {
      try {
        // Получаем категорию из базы данных
        const objectCategory = await this.objectCategoryModel.findOne({
          where: { category },
        });

        if (!objectCategory) {
          throw new HttpException(`Category not found: ${category}`, HttpStatus.BAD_REQUEST);
        }

        const initialLevel = await this.objectLevelModel.findOne({
          where: { objectId: objectCategory.id, level: 1 },
        });

        if (!initialLevel) {
          throw new HttpException(
            `Initial level not found for category: ${category}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.objectCardsService.createObjectCard({
          userId: user.id,
          currentLevelId: initialLevel.id,
        });
      } catch (error) {
        this.logger.error(`Error creating object card for category: ${category}`, error.stack);
        throw error; // Пробрасываем ошибку наверх, чтобы она могла быть обработана на уровне контроллера
      }
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findUserById(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found by email');
    }
    return user;
  }

  async findUserByEmail(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    avatarFile?: Express.Multer.File,
  ): Promise<User> {
    let AccountImg = null;
    if (avatarFile) {
      AccountImg = await this.fileUploadService.uploadFile(avatarFile);
    }

    const [updatedRows] = await this.userModel.update(
      {
        ...updateUserDto,
        AccountImg,
      },
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedRows === 0) {
      throw new NotFoundException('User not found');
    }

    return this.findUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    const deletedRows = await this.userModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
