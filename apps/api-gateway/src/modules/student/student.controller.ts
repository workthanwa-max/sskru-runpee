import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { StudentService } from './services/student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() body: any) {
    return this.studentService.create(body);
  }

  @Put(':id')
  @UseGuards(LocalAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.studentService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
