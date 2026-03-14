// DTO types for Authentication / Identity

export class LoginInput {
  username: string;
  password: string;
}

export class AssignIdentityRoleInput {
  identityId: string;
  roleIds: string[];
}
