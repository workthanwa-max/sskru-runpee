import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RoleService } from './services/role.service';

@Controller('roles')
@UseGuards(LocalAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(@Query('identityId') identityId?: string) {
    return this.roleService.findAll(identityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.roleService.findOne(id); }

  @Get(':id/permissions')
  findPermissions(@Param('id') id: string) { return this.roleService.findPermissionsByRoleId(id); }

  @Post()
  create(@Body() body: any) { return this.roleService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.roleService.update(id, body); }

  @Post(':id/permissions')
  assignPermissions(@Param('id') roleId: string, @Body() body: { permissionIds: string[] }) {
    return this.roleService.assignRolePermissions({ roleId, ...body });
  }
}
