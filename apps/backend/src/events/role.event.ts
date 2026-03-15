export type RolePermissionsAssignedPayload = {
  roleId: string;
  permissionIds: string[];
};
export class RolePermissionsAssigned {
  constructor(public readonly payload: RolePermissionsAssignedPayload) {}
}
