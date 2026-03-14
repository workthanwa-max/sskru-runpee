import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { PermissionService } from './services/permission.service';

@Controller('permissions')
@UseGuards(LocalAuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll() { return this.permissionService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.permissionService.findOne(id); }

  @Get(':id/systems')
  findSystems(@Param('id') id: string) { return this.permissionService.findSystems(id); }

  @Post()
  create(@Body() body: any) { return this.permissionService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.permissionService.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.permissionService.remove(id); }

  @Post(':id/systems')
  assignSystems(@Param('id') permissionId: string, @Body() body: { systemIds: string[] }) {
    return this.permissionService.assignPermissionSystems({ permissionId, ...body });
  }
}
