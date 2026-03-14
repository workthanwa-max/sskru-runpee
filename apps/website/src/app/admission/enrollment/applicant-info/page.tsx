import { EnrollmentStep } from '@src/sections/admission/constant';
import EnrollmentView from '@src/sections/admission/views/enrollment-view';

export default function page() {
  return <EnrollmentView enrollmentStep={EnrollmentStep.APPLICANT_INFO} />;
}
