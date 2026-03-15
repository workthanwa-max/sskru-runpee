// DTO types for Permission

export class CreatePermissionInput {
  name: string;
}

export class UpdatePermissionInput {
  name?: string;
}

export class PermissionSystemInput {
  permissionId: string;
  systemIds: string[];
}
