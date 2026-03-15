import { ProgramType } from '../constant';
import { EnrollmentForm } from './types';

export const FORM_PERSIST_KEY = 'enrollment-form';

export const initialFormValues: EnrollmentForm = {
  programType: ProgramType.REGULAR,
  facultyId: '',
  personalInfo: {
    prefix: '',
    gender: 'male',
    firstname: '',
    lastname: '',
    firstnameEN: '',
    lastnameEN: '',
    email: '',
    birth: new Date(),
    nationality: '',
    phone: '',
    personnelId: '',
  },
  addressInfo: {
    houseNumber: '',
    moo: '',
    street: '',
    subDistrict: '',
    district: '',
    province: '',
    postalCode: '',
  },
  parentInfo: {
    father: {
      firstname: '',
      lastname: '',
      phone: '',
      personnelId: '',
      occupation: '',
    },
    mother: {
      firstname: '',
      lastname: '',
      phone: '',
      personnelId: '',
      occupation: '',
    },
    guardian: {
      firstname: '',
      lastname: '',
      phone: '',
      personnelId: '',
      occupation: '',
      guardian: 'guardian',
    },
    address: {
      houseNumber: '',
      moo: '',
      street: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
    },
  },
  qualification: {
    province: '',
    qualification: '',
    schoolName: '',
    gpax: '',
    academicTranscriptFront: '',
    academicTranscriptBack: '',
  },
};
