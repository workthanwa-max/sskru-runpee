// DTO types for Personnel

export class EducationInput {
  degree: string;
  field: string;
  university: string;
  year: number;
}

export class CreatePersonnelInput {
  personnelId: string;
  firstname: string;
  lastname: string;
  phone: string;
  highestEducation: string;
  university: string;
  graduationYear: number;
  programOrField: string;
  academicPosition?: string;
  facultyIds?: string[];
  educations?: EducationInput[];
}

export class UpdatePersonnelInput {
  personnelId?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  highestEducation?: string;
  university?: string;
  graduationYear?: number;
  programOrField?: string;
  academicPosition?: string;
  facultyIds?: string[];
  educations?: EducationInput[];
}
