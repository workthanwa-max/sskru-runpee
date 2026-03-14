import { ApplicantInfoSchema } from './applicant-info-schema';
import { DocumentSchema } from './document-schema';
import { ParentInfoSchema } from './parent-info-schema';

export const EnrollmentFormSchema = ApplicantInfoSchema.extend({
  parentInfo: ParentInfoSchema,
  qualification: DocumentSchema,
});
