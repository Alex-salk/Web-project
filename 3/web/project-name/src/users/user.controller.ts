import { Controller, Get, UseGuards, Request, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrUpdateUserDto } from './create.or.update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return users;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findById(+id)
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrentUser(@Request() req) {
    const userId = req.user.Id
    const user = await this.usersService.findById(userId)
    return user;
  }


  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUsers(@Param('id') id: number, @Body() сreateUserDto: CreateOrUpdateUserDto) {
    const updateUsers = await this.usersService.updateUsers(id, сreateUserDto)
    return updateUsers
  }


  @UseGuards(AuthGuard)
  @Post()
  async createUsers(@Body() сreateUserDto: CreateOrUpdateUserDto) {
    const newUsers = await this.usersService.createUsers(сreateUserDto)
    return newUsers
  }
  

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUsers(@Param('id') id: number) {
    await this.usersService.deleteUsers(id)
    return
  }

}