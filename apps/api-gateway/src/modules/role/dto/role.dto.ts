// DTO types for Role

export class CreateRoleInput {
  name: string;
  type: 'ADMIN' | 'PERSONNEL' | 'STUDENT';
}

export class RolePermissionInput {
  roleId: string;
  permissionIds: string[];
}
