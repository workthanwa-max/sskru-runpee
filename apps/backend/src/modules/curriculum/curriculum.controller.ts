import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CurriculumService } from './services/curriculum.service';
import { FileStorageService } from 'src/common/storage/file-storage.service';

@Controller('curriculum')
@UseGuards(LocalAuthGuard)
export class CurriculumController {
  constructor(
    private readonly curriculumService: CurriculumService,
    private readonly storage: FileStorageService,
  ) {}

  // Activities
  @Get('activities')
  findAll(@Request() req: any) {
    return this.curriculumService.findAll({ requestedBy: req.user.id });
  }

  @Get('activities/reviewing')
  findReviewing() {
    return this.curriculumService.findReviewing();
  }

  @Get('activities/:id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOne(id);
  }

  @Post('activities/:id/submit')
  submit(@Param('id') id: string) {
    return this.curriculumService.submit(id);
  }

  // Course Implementations (Approval Actions)
  @Get('activities/:id/implementations')
  findImplementations(@Param('id') activityId: string) {
    return this.curriculumService.findActivities(activityId);
  }

  @Post('activities/:id/implementation')
  submitImplementation(@Param('id') activityId: string, @Request() req: any, @Body() body: any) {
    return this.curriculumService.submitApprovalAction(activityId, req.user.id, body);
  }

  // General Info
  @Get('activities/:id/general')
  findGeneralInfo(@Param('id') id: string) {
    return this.curriculumService.findGeneralInfo(id);
  }

  @Post('activities/:id/general')
  submitGeneralInfo(@Param('id') activityId: string, @Request() req: any, @Body() body: any) {
    return this.curriculumService.submitGeneralInfo(activityId, req.user.id, body);
  }

  // Curriculum Info (Content)
  @Post('activities/:id/curriculum')
  submitCurriculumInfo(@Param('id') id: string, @Request() req: any, @Body() body: any) {
    return this.curriculumService.submitContent(id, req.user.id, body);
  }

  // Budget Info
  @Get('activities/:id/budget')
  findBudgetInfo(@Param('id') id: string) {
    return this.curriculumService.findApplications(id);
  }

  @Post('activities/:id/budget')
  submitBudgetInfo(@Param('id') activityId: string, @Request() req: any, @Body() body: any) {
    return this.curriculumService.submitBudgetInfo(activityId, req.user.id, body);
  }

  // File Upload URL
  @Get('upload-url')
  getUploadUrl(@Query('fileName') fileName: string, @Query('contentType') contentType: string) {
    return this.storage.getSignedUrl(fileName, contentType);
  }
}
