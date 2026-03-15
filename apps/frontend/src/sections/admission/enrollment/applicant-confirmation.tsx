import PersonnelInput from './inputs/personal-input';
import SubjectInput from './inputs/subject-input';

export default function ApplicantConfirmation() {
  return (
    <>
      <SubjectInput unstyled readOnly />
      <PersonnelInput unstyled readOnly />
    </>
  );
}
