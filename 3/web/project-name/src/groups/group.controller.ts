import { Controller, Get, Post, Put, Param, Body, UseGuards, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrUpdateGroupDto } from './create.or.update.groups.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const groups = await this.groupService.findAll()
    return groups.map(group => ({ ...group, university: group.university_id || {} }))
  }

  @UseGuards(AuthGuard)
  @Post()
  async createGroup(@Body() createGroupDto: CreateOrUpdateGroupDto) {
    const newGroup = await this.groupService.createGroup(createGroupDto);
    return newGroup
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateGroup(@Param('id') id: number, @Body() updateGroupDto: CreateOrUpdateGroupDto) {
    const updatedGroup = await this.groupService.updateGroup(id, updateGroupDto)
    return updatedGroup
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteGroup(@Param('id') id: number) {
    await this.groupService.deleteGroup(id)
    return
  }
}