import AddressInput from './inputs/address-input';
import PersonnelInput from './inputs/personal-input';
import SubjectInput from './inputs/subject-input';

export default function ApplicantInfoForm() {
  return (
    <>
      <SubjectInput />
      <PersonnelInput prefixInputObjectName="personalInfo" />
      <AddressInput prefixInputObjectName="addressInfo" />
    </>
  );
}
