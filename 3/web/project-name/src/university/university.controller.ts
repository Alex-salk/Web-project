import { Controller, Get, Post, Put, Param, Body, UseGuards, Delete } from '@nestjs/common';
import { UniversityService } from './university.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrUpdateUniversityDto } from './create.or.update.user.dto';

@Controller('university') 
export class UniversityController {
  constructor(private readonly institutionsService: UniversityService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const universities = await this.institutionsService.findAll(); 
    return universities
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUniversity(@Body() createUniversityDto: CreateOrUpdateUniversityDto) {
    try {
      const newUniversity = await this.institutionsService.createUniversity(createUniversityDto)
      return newUniversity
    } catch (error) {
      console.log(error)
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUniversity(@Param('id') id: number, @Body() updateUniversityDto: CreateOrUpdateUniversityDto) {
    const updatedUniversity = await this.institutionsService.updateUniversity(id, updateUniversityDto)
    return updatedUniversity;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUniversity(@Param('id') id: number) {
    await this.institutionsService.deleteUniversity(id)
    return
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findUniversityById(@Param('id') id: number) {
    const university = await this.institutionsService.findUniversityById(id)
    return university
  }
}