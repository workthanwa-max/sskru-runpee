import { ForbiddenError, BadRequestError } from 'src/common/errors';

export type CurriculumStatus = 'DRAFT' | 'SUBMITTED' | 'IN_PROGRESS' | 'REJECTED' | 'APPROVED';

export interface DomainCurriculum {
  id: string;
  status: CurriculumStatus;
  requestedBy: string;
}

export interface DomainCurriculumGeneralInfo {
  id: string;
}

export class CurriculumDomain {
  static validateSubmission(curriculum: DomainCurriculum | null | undefined, generalInfo: DomainCurriculumGeneralInfo | null | undefined) {
    if (!curriculum || !generalInfo) {
      throw new BadRequestError(' ข้อมูลหลักสูตรไม่ครบถ้วน ไม่สามารถส่งตรวจสอบได้');
    }
  }

  static handleReissue(prev: DomainCurriculum, requestedBy: string): { shouldUpdateToDraft: boolean } {
    if (prev.status === 'REJECTED') {
      if (prev.requestedBy !== requestedBy) {
        throw new ForbiddenError('ไม่มีสิทธิ์แก้ไขหลักสูตรนี้');
      }
      return { shouldUpdateToDraft: true };
    }
    return { shouldUpdateToDraft: false };
  }
}
