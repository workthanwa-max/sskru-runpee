import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FacultyService } from './services/faculty.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('faculties')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  findAll() {
    return this.facultyService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(id);
  }

  @Get(':id/children')
  @UseGuards(LocalAuthGuard)
  findChildren(@Param('id') id: string) {
    return this.facultyService.findChildren(id);
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() body: any) {
    return this.facultyService.create(body);
  }
}
