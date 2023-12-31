import { Controller, Get, Post, Put, Param, Body, UseGuards, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrUpdateStudentDto } from './create.or.update.student.dto'; 

@Controller('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const students = await this.studentsService.findAll()
    return students
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateStudent(@Param('id') id: number, @Body() updateStudentDto: CreateOrUpdateStudentDto) {
    const updatedStudent = await this.studentsService.updateStudent(id, updateStudentDto)
    return updatedStudent;
  }

  @UseGuards(AuthGuard)
  @Post()
  async createStudent(@Body() createStudentDto: CreateOrUpdateStudentDto) {
    const newStudent = await this.studentsService.createStudent(createStudentDto);
    return newStudent
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteStudent(@Param('id') id: number) {
    await this.studentsService.deleteStudent(id)
    return
  }
}