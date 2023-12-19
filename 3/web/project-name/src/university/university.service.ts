import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { University } from './university.entity';
import { CreateOrUpdateUniversityDto } from './create.or.update.user.dto'; 

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async findAll(): Promise<University[]> {
    return await this.universityRepository.find();
  }

  async updateUniversity(id: number, updateUniversityDto: CreateOrUpdateUniversityDto): Promise<University | null> {
    const options: FindOneOptions<University> = {
      where: { university_id: id },
    };
    const university = await this.universityRepository.findOne(options); 
    if (!university) {
      return null
    }

    Object.assign(university, updateUniversityDto)
    return await this.universityRepository.save(university)
  }

  async createUniversity(createUniversityDto: CreateOrUpdateUniversityDto): Promise<University> {
    const newUniversity = this.universityRepository.create(createUniversityDto)
    return await this.universityRepository.save(newUniversity)
  }

  async deleteUniversity(id: number): Promise<void> {
    const result = await this.universityRepository.delete(id)
  }

  async findUniversityById(id: number): Promise<University | undefined> {
    const university = await this.universityRepository.findOne({ where: { university_id: id } })
  
    if (!university) {
      throw new NotFoundException()
    }
  
    return university;
  }
}
