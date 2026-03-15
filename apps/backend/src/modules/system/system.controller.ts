import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { SystemService } from './services/system.service';

@Controller('systems')
@UseGuards(LocalAuthGuard)
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  findAll() { return this.systemService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.systemService.findOne(id); }

  @Post()
  create(@Body() body: any) { return this.systemService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.systemService.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.systemService.remove(id); }
}
