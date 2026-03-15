// DTO types for Authentication / Identity

export class LoginInput {
  username: string;
  password: string;
}

export class AssignIdentityRoleInput {
  identityId: string;
  roleIds: string[];
}

export class RegisterInput {
  personnelId: string;   // เลขบัตรประชาชน — จะถูกเก็บเป็น username
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
}
