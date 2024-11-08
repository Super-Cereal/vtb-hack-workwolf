import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectCategory, ObjectCategoryEnum } from '../models/object-category.model';
import { ObjectLevel } from '../models/object-level.model';
import { ObjectCardsService } from 'src/object-cards/object-cards.service';

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
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto);

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
          where: { objectId: objectCategory.id, level: 0 },
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

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const [updatedRows] = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });

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
