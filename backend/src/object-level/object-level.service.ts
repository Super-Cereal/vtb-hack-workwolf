import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectLevel } from 'src/models/object-level.model';
import { CreateManyObjectLevelsDto, CreateObjectLevelDto } from './dto/create-object-level.dto';
import { UpdateObjectLevelDto } from './dto/update-object-level.dto';

@Injectable()
export class ObjectLevelService {
  constructor(
    @InjectModel(ObjectLevel)
    private objectLevelModel: typeof ObjectLevel,
  ) {}

  async create(createObjectLevelDto: CreateObjectLevelDto): Promise<ObjectLevel> {
    return this.objectLevelModel.create(createObjectLevelDto);
  }

  async createMany(createManyObjectLevelsDto: CreateManyObjectLevelsDto): Promise<ObjectLevel[]> {
    return this.objectLevelModel.bulkCreate(createManyObjectLevelsDto.objectLevels);
  }

  async findAll(): Promise<ObjectLevel[]> {
    return this.objectLevelModel.findAll();
  }

  async findOne(id: string): Promise<ObjectLevel> {
    return this.objectLevelModel.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateObjectLevelDto: UpdateObjectLevelDto,
  ): Promise<[number, ObjectLevel[]]> {
    return this.objectLevelModel.update(updateObjectLevelDto, { where: { id }, returning: true });
  }

  async remove(id: string): Promise<number> {
    return this.objectLevelModel.destroy({ where: { id } });
  }
}
