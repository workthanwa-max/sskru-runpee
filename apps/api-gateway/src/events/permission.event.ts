export type PermissionSystemsAssignedPayload = {
  permissionId: string;
  systemIds: string[];
};
export class PermissionSystemsAssigned {
  constructor(public readonly payload: PermissionSystemsAssignedPayload) {}
}
