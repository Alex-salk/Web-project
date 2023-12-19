import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Groups } from './group.entity';
import { CreateOrUpdateGroupDto } from './create.or.update.groups.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupRepository: Repository<Groups>,
  ) {}

  async findAll(): Promise<Groups[]> {
    return await this.groupRepository.find();
  }

  async updateGroup(id: number, updateGroupDto: CreateOrUpdateGroupDto): Promise<Groups | null> {
    const options: FindOneOptions<Groups> = {
      where: { group_id: id },
    };
    const group = await this.groupRepository.findOne(options);
    if (!group) {
      return null;
    }

    Object.assign(group, updateGroupDto);
    return await this.groupRepository.save(group);
  }

  async createGroup(createGroupDto: CreateOrUpdateGroupDto): Promise<Groups> {
    const newGroup = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(newGroup);
  }

  async deleteGroup(id: number): Promise<void> {
    const result = await this.groupRepository.delete(id);
    return;
  }
}