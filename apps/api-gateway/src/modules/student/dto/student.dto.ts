export class CreateStudentInput {
  studentId: string;
  firstname: string;
  lastname: string;
  phone?: string;
  email?: string;
  facultyId?: string;
  program?: string;
  year?: number;
}

export class UpdateStudentInput {
  studentId?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  facultyId?: string;
  program?: string;
  year?: number;
}
