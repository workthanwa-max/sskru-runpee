import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { PersonnelService } from './services/personnel.service';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  findAll() {
    return this.personnelService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  findOne(@Param('id') id: string) {
    return this.personnelService.findOne(id);
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() body: any) {
    return this.personnelService.create(body);
  }

  @Put(':id')
  @UseGuards(LocalAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.personnelService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  remove(@Param('id') id: string) {
    return this.personnelService.remove(id);
  }

  @Get('upload-url')
  @UseGuards(LocalAuthGuard)
  getUploadUrl(@Query('filePath') filePath: string, @Query('contentType') contentType: string) {
    return this.personnelService.getPersonnelUploadURL(filePath, contentType);
  }

  @Put(':id/roles')
  @UseGuards(LocalAuthGuard)
  assignRoles(@Param('id') id: string, @Body('roleIds') roleIds: string[]) {
    return this.personnelService.assignRoles(id, roleIds);
  }
}
